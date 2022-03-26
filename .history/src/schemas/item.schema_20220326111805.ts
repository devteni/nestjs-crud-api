import * as mongoose from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop()
  name: string;

  @Prop()
  qty: number;

  @Prop()
  description: string;
}

export const ItemSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  description: String,
});
