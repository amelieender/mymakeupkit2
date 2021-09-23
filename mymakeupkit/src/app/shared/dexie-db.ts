import Dexie from 'dexie';
import { Makeup } from './makeup';

class MyAppDatabase extends Dexie {
    // Declare implicit table properties.
    // (just to inform Typescript. Instanciated by Dexie in stores() method)
    makeup: Dexie.Table<Makeup, number>; // number = type of the primkey
    //...other tables goes here...

    constructor () {
        super("MyAppDatabase");
        this.version(1).stores({
            makeup: 'id, productname, brandname, category, opened, durability, image, latitude, longitude',
            //...other tables goes here...
        });
        // The following line is needed if your typescript
        // is compiled using babel instead of tsc:
        this.makeup = this.table("makeup");
    }
}

const idb = new MyAppDatabase();

idb.open().catch(err => {
    console.error('Opened failed: ${err.stack}');
});