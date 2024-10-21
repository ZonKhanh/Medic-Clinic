import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './schema/appointment.schema';
import { DoctorService } from '../doctors/doctor.service';
import { PatientService } from '../patients/patient.service';
import { DepartmentService } from '../departments/department.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private departmentService: DepartmentService,
  ) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { departmentId, doctorId, phoneNumber, date, timeSlot } = createAppointmentDto;

    // Kiểm tra và lấy thông tin bệnh nhân dựa trên số điện thoại
    const patient = await this.patientService.findByPhoneNumber(phoneNumber);
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    let selectedDoctorId = doctorId;
    if (!selectedDoctorId) {
      // Nếu không chọn bác sĩ cụ thể, chọn ngẫu nhiên một bác sĩ có lịch trống
      const availableDoctors = await this.doctorService.getAvailableDoctorsByDepartment(departmentId, date, timeSlot);
      if (availableDoctors.length === 0) {
        throw new BadRequestException('No available doctors for the selected time');
      }
      selectedDoctorId = availableDoctors[Math.floor(Math.random() * availableDoctors.length)].id;
    } else {
      // Kiểm tra xem bác sĩ đã chọn có lịch trống không
      const isAvailable = await this.doctorService.isDoctorAvailable(selectedDoctorId, date, timeSlot);
      if (!isAvailable) {
        throw new BadRequestException('Selected doctor is not available at the chosen time');
      }
    }

    const newAppointment = new this.appointmentModel({
      doctor: selectedDoctorId,
      patient: patient.id,
      date,
      timeSlot,
      status: 'pending',
    });

    return newAppointment.save();
  }

  async getAvailableAppointments(departmentId: string): Promise<any[]> {
    const doctors = await this.doctorService.getDoctorsByDepartment(departmentId);
    const availableSlots = [];

    for (const doctor of doctors) {
      const availability = await this.getDoctorAvailability(doctor.id, new Date());
      if (availability.length > 0) {
        availableSlots.push({
          doctorId: doctor.id,
          doctorName: doctor.user.firstName + ' ' + doctor.user.lastName,
          availableSlots: availability,
        });
      }
    }

    return availableSlots;
  }

  async getDoctorAvailability(doctorId: string, date: Date): Promise<number[]> {
    const bookedSlots = await this.appointmentModel.find({
      doctor: doctorId,
      date: {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999)),
      },
    }).select('timeSlot');

    const allSlots = [8, 9, 10, 11, 13, 14, 15, 16];
    return allSlots.filter(slot => !bookedSlots.some(booked => booked.timeSlot === slot));
  }

  async getPatientAppointments(patientId: string): Promise<Appointment[]> {
    return this.appointmentModel.find({ patient: patientId }).populate('doctor').exec();
  }

  async getDoctorAppointments(doctorId: string, date: Date): Promise<Appointment[]> {
    return this.appointmentModel.find({
      doctor: doctorId,
      date: {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999)),
      },
    }).populate('patient').exec();
  }

  async updateAppointmentStatus(appointmentId: string, status: string): Promise<Appointment> {
    return this.appointmentModel.findByIdAndUpdate(appointmentId, { status }, { new: true }).exec();
  }
}