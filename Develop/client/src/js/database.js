import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //Create a connection to the database:
  const contactDb = await openDB('jate', 1);

  //create a new transaction:
  const tx = contactDb.transaction('jate', 'readwrite');

  // Open the object store.
  const store = tx.objectStore('jate');

  //Use the .add() to store and pass the text:
  const request = store.add({ content: content })

  //get confirmation
  const result = await request;
  console.log('Data added to database', result);
}

//console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //Create a connection:
  const contactDb = await openDB('jate', 1);

  //create new transaction:
  const tx = contactDb.transaction('jate', 'readonly');

  //open the object store.
  const store = tx.objectStore('jate');

  //Use the .getAll() to get all the data
  const request = store.getAll();

  //get confirmation of request
  const result = await request;
  console.log('result.value', result);
  return result;
}


//console.error('getDb not implemented');

initdb();
