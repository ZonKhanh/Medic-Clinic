import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Doctor extends Document {

  @Prop({ required: true })
  specialization: string;

  @Prop({ required: true })
  licenseNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);