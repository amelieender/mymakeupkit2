import Dexie from 'dexie';
import { Makeup } from './makeup';
// import './makeup-store.service';

export class MakeupDB extends Dexie {
    // Declare implicit table properties.
    // (just to inform Typescript. Instanciated by Dexie in stores() method)
    makeup: Dexie.Table<Makeup, number>; // number = type of the primkey
    //...other tables goes here...

    constructor () {
        super("MakeupDB");
        this.version(1).stores({
            makeup: 'id, productname, brandname, category, opened, durability, image, latitude, longitude',
            //...other tables goes here...
        });
        // The following line is needed if your typescript
        // is compiled using babel instead of tsc:
        this.makeup = this.table("makeup");
    }
}

const idb = new MakeupDB();

idb.open().catch(err => {
    console.error(`Opened failed: ${err.stack}`);
});

export function addData(items: Makeup[]) {
    items.forEach(item => idb.makeup.put(item));
}

export function getData() {
    return idb.makeup.toArray();
}

export function getSingleData(id: number) {
    return idb.makeup.get(id);
}

export function updateData(id: number, data: Makeup) {
    return idb.makeup.update(id, data);
}

export function deleteData(id: number) {
    return idb.makeup.delete(id);
}

export function createData(makeup: Makeup) {
    return idb.makeup.put(makeup);
}