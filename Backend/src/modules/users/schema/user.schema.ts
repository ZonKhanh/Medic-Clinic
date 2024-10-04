import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Gender, UserStatus, UserRole } from '../../../config/constants';
import { Document, Schema as MongooseSchema } from "mongoose";

export type UserDocument = User & Document;

@Schema({
  timestamps: true, // Tự động thêm createdAt và updatedAt
})
export class User {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, maxlength: 100, trim: true })
  firstName: string;

  @Prop({ required: true, maxlength: 100, trim: true })
  lastName: string;

  @Prop({ required: true, unique: true, maxlength: 100, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, maxlength: 100 })
  password: string;

  @Prop({ required: true, unique: true, maxlength: 20, sparse: true, trim: true })
  phoneNumber?: string;

  @Prop({ required: false, maxlength: 255, trim: true })
  address?: string;

  @Prop({ required: false, enum: Gender })
  gender?: Gender;

  @Prop({ required: true, enum: UserRole, index: true })
  role: UserRole;

  @Prop({ required: true, enum: UserStatus, index: true, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Prop({ required: false, trim: true })
  avatarUrl?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  updatedBy: User;

  @Prop({ type: String, ref: 'User' })
  deletedBy?: MongooseSchema.Types.ObjectId;

  @Prop()
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Thêm index cho các trường thường được sử dụng trong truy vấn
UserSchema.index({ email: 1, phoneNumber: 1 });
UserSchema.index({ role: 1, status: 1 });

// Thêm các phương thức hoặc virtual properties nếu cần
UserSchema.virtual('fullName').get(function(this: User) {
  return `${this.firstName} ${this.lastName}`;
});