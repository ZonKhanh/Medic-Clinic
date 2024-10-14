import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schema/user.schema';
import { Department } from '../../departments/schema/department.schema';
import { AcademicDegree } from 'src/config/constants';

export type DoctorDocument = Doctor & Document;

@Schema()
export class Doctor {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Department', required: true })
  department: Types.ObjectId;

  @Prop({ required: true, maxlength: 255 })
  specialization: string;

  @Prop({ required: true, min: 0 })
  experience: number;

  @Prop({ maxlength: 255 })
  bio: string;

  @Prop({ required: true, enum: AcademicDegree, index: true })
  education: AcademicDegree;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  patients: Types.ObjectId[];

}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);