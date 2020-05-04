# PseudoDB

Lite & fast DB simulator for testing.

```js
var pdb = require('pseudodb');
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install pseudodb
```

## Features

- Makes code testing easier
- Mimics Firestore
- Now supports graphDB properties

## Functions

_To create a new DB:_

```js
pdb.createDb(db_name);
```

---

_To add a new document with a random id:_

```js
pdb.addDoc(db_name, data_Object);
```

---

_To create a new document with a specific id or to modify an exisitng document_

```js
pdb.setDoc(db_name, id, data_Object);
```

---

_To change a particular field of a document_

```js
pdb.setField(db_name, id, field, value);
```

---

_To get details of a particular document_

```js
var result = pdb.getDoc(db_name, id);
```

---

_To get details of a particular db_

```js
var result = pdb.getDb(db_name);
```

---

_To find a particular document in a db_

```js
var id = pdb.findDoc(db_name, field_name, value); // FInds the first occuring match and returns the id
```

---

_To find documents matching a criteria in a db_

```js
var id = pdb.findAll(db_name, field_name, value); // Finds all occuring matches and returns an array of ids
```

---

---

_To add a relation to a doc with another doc_

```js
pdb.setRel(db, from_doc, relation, to_doc); // Sets brother relation from doc with id a to doc with id b
```

---

_To add a relation group to a doc with another doc_

```js
pdb.setRelGrp(db, from_doc, relation, to_doc); // Adds a  relation from a to b in the friend relation group
```

---

_To get a relation of a doc_

```js
console.log(relations.getRel(db, doc, relation)); // Logs the brother relation of the doc a
```

---

_To delete a db_

```js
pdb.deleteDb(db_name);
```

---

_To Monitor Changes in a db_

```js
subscribe(db).on('dbChange', callBack(currentDbContent, previousDbContent));
```

## Example Code

```js
const pdb = require('pseudodb');

pdb.createDb('test'); //Create a db with name test

pdb.addDoc('test', {
	name: 'Elliot',
	age: 18,
}); /*Add a new document with a random id.
Take a look at the new file named test to see the added document
*/

pdb.setDoc('test', 'a', { name: 'Alwin', age: 23 }); //Creates a doc with the id 'a' and stores the object

pdb.setDoc('test', 'a', { name: 'Alwin', age: 20 }); //Changes the document with the id a

pdb.setField('test', 'a', 'name', 'Rex'); //Changes the field name of the document with id a

pdb.setField('test', 'a', 'Developer', 'No'); //Adds a new field Developer

pdb.setRel('test', 'a', 'brother', 'b'); // Sets brother relation from doc with id a to doc with id b

console.log(pdb.getDoc('test', 'a')); // Logs the content of the doc with id a to the console

console.log(pdb.getDb('test')); // Logs the content of the db to the console

console.log(pdb.getDoc('test', 'a').name); //Since the getdoc function returns an object, you can access the fields this way

console.log(pdb.findDoc('test', 'name', 'Alwin')); //Logs the id of the document which has the field 'name' as 'Alwin'

console.log(pdb.findAll('test', 'age', 20)); //Logs an array of ids of all docs which has age as 20

subscribe('test').on('dbChange', (curr, prev) =>
	console.log('Current: ', curr, ' Previous: ', prev)
); // Monitors the db and Logs current and previous content of the db when db is changed

console.log(relations.getRel('test', 'a', 'brother')); // Logs the brother relation of the doc a

pdb.deleteDb('test'); //Deletes the db
```
