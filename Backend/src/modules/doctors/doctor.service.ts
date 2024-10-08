import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DoctorSchedule } from './schema/doctor-schedule.schema';
import { CreateDoctorScheduleDto } from './dto/create-doctor-schedule.dto';
import { UpdateDoctorScheduleDto } from './dto/update-doctoc-schedule.dto'
import { startOfDay, endOfDay, setHours, startOfHour } from 'date-fns';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(DoctorSchedule.name) private doctorScheduleModel: Model<DoctorSchedule>
  ) {}

  async createSchedule(createScheduleDto: CreateDoctorScheduleDto, user: any) {
    const { date, hours } = createScheduleDto;

    const schedules = hours.map(hour => ({
      doctorId: user._id,
      dateTime: setHours(new Date(date), hour),
      isAvailable: true
    }));

    return this.doctorScheduleModel.insertMany(schedules);
  }

  async getDoctorSchedule(doctorId: string, date: Date) {
    return this.doctorScheduleModel.find({
      doctorId,
      dateTime: {
        $gte: startOfDay(date),
        $lt: endOfDay(date)
      }
    }).sort({ dateTime: 1 });
  }

  async updateSchedule(id: string, updateScheduleDto: UpdateDoctorScheduleDto, user: any) {
    const schedule = await this.doctorScheduleModel.findById(id);

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    if (schedule.doctorId.toString() !== user._id.toString()) {
      throw new ForbiddenException('You do not have permission to update this schedule');
    }

    Object.assign(schedule, updateScheduleDto);
    return schedule.save();
  }

  async deleteSchedule(id: string, user: any) {
    const schedule = await this.doctorScheduleModel.findById(id);

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    if (schedule.doctorId.toString() !== user._id.toString()) {
      throw new ForbiddenException('You do not have permission to delete this schedule');
    }

    return this.doctorScheduleModel.findByIdAndDelete(id);
  }
}