import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Appointment extends Document {
  @Prop({ type: Date, required: true })
  dateTime: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  patientId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Doctor', required: true })
  doctorId: Types.ObjectId;

  @Prop({ required: true })
  patientName: string;

  @Prop({ required: true })
  patientPhone: string;

  @Prop({ default: 'pending' })
  status: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);