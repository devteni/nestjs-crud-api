import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [
    {
      id: 'ldjfwio23092',
      name: 'Item One',
      qty: 100,
      description: 'This is item one',
    },
    {
      id: 'ldjfwio23092',
      name: 'Item Two',
      qty: 200,
      description: 'This is item two',
    },
  ];
}
