import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Gender, UserStatus, UserRole } from '../../../config/constants';
import {
  IsEmail,
  IsIn,
  MaxLength,
  IsBoolean,
  IsOptional,
  IsString
} from "class-validator";

export type UserDocument = User & Document;
import { Document, Schema as MongooseSchema } from "mongoose";
export const STATUS = [UserStatus.ACTIVE, UserStatus.INACTIVE] as const;
export const GENDER = [Gender.FEMALE, Gender.MALE] as const;
export const ROLE = [
  UserRole.ADMIN,
  UserRole.DOCTOR,
  UserRole.PATIENT,
  UserRole.RECEPTIONIST,
] as const;

@Schema()
export class User {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @MaxLength(100, { message: 'Exceeds $constraint1 characters allowed' })
  firstName: string;

  @Prop({ required: true })
  @MaxLength(100, { message: 'Exceeds $constraint1 characters allowed' })
  lastName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  @IsEmail()
  @MaxLength(100, { message: 'Exceeds $constraint1 characters allowed' })
  email: string;

  @Prop({ required: true })
  @MaxLength(100, { message: 'Exceeds $constraint1 characters allowed' })
  password: string;

  @Prop({ required: false, unique: true })
  @MaxLength(20, { message: 'Exceeds $constraint1 characters allowed' })
  phoneNumber: string;

  @Prop({ required: false })
  @MaxLength(255, { message: 'Exceeds $constraint1 characters allowed' })
  address: string;

  @Prop({ required: false, enum: Gender })
  @IsIn(GENDER)
  gender: Gender;

  @Prop({ required: true, enum: UserRole, index: true })
  @IsIn(ROLE)
  role: UserRole;

  @Prop({ required: true, enum: UserStatus, index: true, default: UserStatus.ACTIVE })
  @IsIn(STATUS)
  status: UserStatus;

  @IsOptional()
  @IsString()
  @Prop([String])
  avatarUrls: string[];

  @Prop({ default: Date.now, immutable: true })
  createdDate: Date;

  @Prop({ default: Date.now })
  updatedDate: Date;

  @Prop({ required: false })
  deletedDate: Date;

  @Prop({ required: false })
  createBy: string;

  @Prop({ required: false })
  updatedBy: string;

  @Prop({ required: false })
  deletedBy: string;
}

export const UserSchema = SchemaFactory.createForClass(User);