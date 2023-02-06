import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Skills extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  color: string;
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);
