import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Gender, Status, UserRole } from '../../../config/constants';
import { Document, Types } from "mongoose";
import { toVietnamTime } from "src/utils/timeUtil";

export type UserDocument = User & Document;

@Schema({
  timestamps: { currentTime: toVietnamTime },
})

export class User {
  @Prop({ required: true, maxlength: 100, trim: true })
  firstName: string;

  @Prop({ required: true, maxlength: 100, trim: true })
  lastName: string;

  @Prop({ required: true, unique: true, maxlength: 100, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, maxlength: 100 })
  password: string;

  @Prop({ required: false, unique: true, maxlength: 20, sparse: true, trim: true })
  phoneNumber?: string;

  @Prop({ maxlength: 255, trim: true })
  address?: string;

  @Prop({ enum: Gender })
  gender?: Gender;

  @Prop({ type: Date })
  dob: Date;

  @Prop({ unique: true, maxlength: 20 })
  nationalId?: string;

  @Prop({ required: true, enum: UserRole, index: true })
  role: UserRole;

  @Prop({ required: true, enum: Status, index: true, default: Status.ACTIVE })
  status: Status;

  @Prop({ trim: true })
  avatarUrl?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  deletedBy: Types.ObjectId;

  @Prop({ type: Date })
  deletedAt?: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1, phoneNumber: 1 });
UserSchema.index({ role: 1, status: 1 });


// UserSchema.virtual('fullName').get(function() {
//   return `${this.firstName} ${this.lastName}`;
// });

// UserSchema.set('toJSON', {
//   virtuals: true,
//   transform: function(doc, ret) {
//     ret.fullName = `${ret.firstName} ${ret.lastName}`;
//     return ret;
//   }
// });