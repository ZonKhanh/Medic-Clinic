import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class DoctorSchedule extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Doctor', required: true })
  doctorId: Types.ObjectId;

  @Prop({ type: Date, required: true })
  dateTime: Date;

  @Prop({ default: true })
  isAvailable: boolean;
}

export const DoctorScheduleSchema = SchemaFactory.createForClass(DoctorSchedule);