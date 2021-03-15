import { Injectable } from '@angular/core';
import { Makeup } from './makeup';

@Injectable({
  providedIn: 'root'
})
export class MakeupStoreService {
  makeupItems: Makeup[] = []; 

  constructor() { 
    this.makeupItems = [
      {
        id: "1",
        productname: 'Hoola Matte',
        brandname: 'Benefit',
        category: 'Bronzer',
        opened: new Date(2021, 2, 21),
        durability: 12
      },
      {
        id: "2",
        productname: 'Satin Taupe',
        brandname: 'MAC',
        category: 'Eyeshadow',
        opened: new Date(2020, 6, 13),
        durability: 24
      },
      {
        id: "3",
        productname: 'Mademoiselle',
        brandname: 'Chanel',
        category: 'Lipstick',
        opened: new Date(2020, 9, 7),
        durability: 6
      },
    ]
  }
  getAll(): Makeup[] {
    return this.makeupItems;
  }

  getSingle(id: string): Makeup | undefined {
    return this.makeupItems.find(makeup => (makeup.id === id));
  }
}
