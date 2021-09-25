import Dexie from 'dexie';
import { Makeup } from './makeup';

export class MakeupDBSync extends Dexie {
    // Declare implicit table properties.
    // (just to inform Typescript. Instanciated by Dexie in stores() method)
    makeupSync: Dexie.Table<Makeup, number>; // number = type of the primkey
    //...other tables goes here...

    constructor () {
        super("MakeupDBSync");
        this.version(1).stores({
            makeupSync: 'id, productname, brandname, category, opened, durability, image, latitude, longitude',
            //...other tables goes here...
        });
        // The following line is needed if your typescript
        // is compiled using babel instead of tsc:
        this.makeupSync = this.table("makeupSync");
    }
}

const idb = new MakeupDBSync();

idb.open().catch(err => {
    console.error(`Opened failed: ${err.stack}`);
});

export function writeData(item: Makeup) {
    return idb.makeupSync.put(item);
}