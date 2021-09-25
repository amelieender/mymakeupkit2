/// <reference lib="webworker" />
import {addData, deleteData, updateData} from './shared/dexie-db';
// self.importScripts('./shared/dexie-db');

addEventListener('message', ({ data }) => {
  console.log(data)
  if (data.name === 'addData') {
    addData(data.data);
  } else if (data.name === 'updateDataSingle') {
    updateData(data.id, data.data);
  } else if (data.name === 'deleteDataSingle') {
    deleteData(data.id);
  }
});