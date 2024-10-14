import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Status } from 'src/config/constants';
import { User } from 'src/modules/users/schema/user.schema';
import { toVietnamTime } from 'src/utils/timeUtil';

export type DepartmentDocument = Department & Document;

@Schema({
    timestamps: { currentTime: toVietnamTime },
})

export class Department {

    @Prop({ required: true, maxlength: 255, trim: true })
    title: string;

    @Prop({ required: true, maxlength: 500, trim: true })
    description: string;

    @Prop({ required: true, enum: Status, index: true, default: Status.ACTIVE })
    status: Status;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    createdBy: User;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    updatedBy: User;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    deletedBy: User;

    @Prop()
    deletedAt?: Date;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Doctor' }], default: [] })
    doctors: string[];
   
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);