import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './interfaces/item.interface';
import { ItemDocument } from 'src/schemas/item.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel('Item') private readonly items: Model<ItemDocument>,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.items.find();
  }

  async findOne(id: string): Promise<Item> {
    return await this.items.findOne({ _id: id });
  }

  async create(item: Item): Promise<Error | Item> {
    try {
      const newItem = await this.items.create(item);
      return await newItem.save();
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async delete(id: string): Promise<Item> {
    return await this.items.findByIdAndRemove(id);
  }

  async update(id: string, item: Item): Promise<Item> {
    return await this.items.findByIdAndUpdate(id, item, { new: true });
  }
}
