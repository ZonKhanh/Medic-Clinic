import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RevokedToken extends Document {
    @Prop({ required: true, unique: true })
    token: string;

    @Prop({ default: Date.now })
    revokedAt: Date;
}

export const RevokedTokenSchema = SchemaFactory.createForClass(RevokedToken);