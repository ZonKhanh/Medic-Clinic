import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { BenifitCode } from "src/config/constants";



export type PatientDocument = Patient & Document;

@Schema()
export class Patient {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
    user: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Doctor' })
    primaryDoctor?: Types.ObjectId;  

    @Prop({ type: [{ type: Types.ObjectId, ref: 'VisitHistory' }], default: [] })
    visitHistory?: string[];
    
    @Prop({ unique: true, maxlength: 255 })
    insuranceNumber?: string

    @Prop({ enum: BenifitCode, index: true })
    benifitId?: BenifitCode

    @Prop({ maxlength: 255 })
    emergencyContactName?: string;
  
    @Prop({ maxlength: 20 })
    emergencyContactPhone?: string;
  
    @Prop({ maxlength: 255 })
    emergencyContactRelationship?: string;

}

export const PatientSchema = SchemaFactory.createForClass(Patient);