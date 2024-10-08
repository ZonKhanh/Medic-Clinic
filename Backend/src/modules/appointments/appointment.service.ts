import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from './schema/appointment.schema';
import { DoctorSchedule } from '../doctors/schema/doctor-schedule.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { GetAppointmentsDto } from  './dto/get-appointments.dto'
import { startOfDay, endOfDay, setHours, startOfHour, addHours, format } from 'date-fns';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
    @InjectModel(DoctorSchedule.name) private doctorScheduleModel: Model<DoctorSchedule>
  ) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto, user: any) {
    const { doctorId, dateTime } = createAppointmentDto;

    // Kiểm tra lịch bác sĩ
    const doctorSchedule = await this.doctorScheduleModel.findOne({
      doctorId,
      dateTime: startOfHour(new Date(dateTime)),
      isAvailable: true
    });

    if (!doctorSchedule) {
      throw new BadRequestException('Doctor is not available at this time');
    }

    // Tạo appointment
    const appointment = new this.appointmentModel({
      ...createAppointmentDto,
      patientId: user._id,
      patientName: user.name,
      patientPhone: user.phone
    });

    // Cập nhật lịch bác sĩ
    doctorSchedule.isAvailable = false;
    await doctorSchedule.save();

    return appointment.save();
  }

  async getAppointments(query: GetAppointmentsDto, user: any) {
    const filter: any = {};

    if (query.date) {
      filter.dateTime = {
        $gte: startOfDay(new Date(query.date)),
        $lt: endOfDay(new Date(query.date))
      };
    }

    if (user.role === 'patient') {
      filter.patientId = user._id;
    } else if (user.role === 'doctor') {
      filter.doctorId = user._id;
    }

    return this.appointmentModel.find(filter)
      .sort({ dateTime: 1 })
      .populate('doctorId', 'name specialization');
  }

  async getAvailableSlots(doctorId: string, date: Date) {
    const availableSlots = [];

    for (let hour = 8; hour < 17; hour++) {
      if (hour !== 12) {
        const slotTime = setHours(date, hour);
        const doctorSchedule = await this.doctorScheduleModel.findOne({
          doctorId,
          dateTime: startOfHour(slotTime),
          isAvailable: true
        });

        if (doctorSchedule) {
          availableSlots.push({
            time: format(slotTime, 'HH:mm'),
            scheduleId: doctorSchedule._id
          });
        }
      }
    }

    return availableSlots;
  }

  async updateAppointment(id: string, updateAppointmentDto: UpdateAppointmentDto, user: any) {
    const appointment = await this.appointmentModel.findById(id);

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    if (user.role !== 'admin' && appointment.patientId.toString() !== user._id.toString()) {
      throw new ForbiddenException('You do not have permission to update this appointment');
    }

    Object.assign(appointment, updateAppointmentDto);
    return appointment.save();
  }

  async cancelAppointment(id: string, user: any) {
    const appointment = await this.appointmentModel.findById(id);

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    if (user.role !== 'admin' && appointment.patientId.toString() !== user._id.toString()) {
      throw new ForbiddenException('You do not have permission to cancel this appointment');
    }

    appointment.status = 'cancelled';
    await appointment.save();

    // Cập nhật lại lịch bác sĩ
    await this.doctorScheduleModel.findOneAndUpdate(
      { doctorId: appointment.doctorId, dateTime: appointment.dateTime },
      { isAvailable: true }
    );

    return { message: 'Appointment cancelled successfully' };
  }
}