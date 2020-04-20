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

_To get a details of a particular document_

```js
var result = pdb.getField(db_name, id);
```
