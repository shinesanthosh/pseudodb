const pdb = require('./index');

test('Creating a db and reading it', () => {
	pdb.createDb('test');
	expect(() => {
		pdb.createDb('test');
	}).toThrowError('DB Already Exists');
});

test('Adding a Doc,Set a field ,Reading it and Deleting it', () => {
	const id = pdb.addDoc('test', { name: 'someone', age: '18' });
	pdb.setField('test', id, 'age', '20');
	expect(pdb.getDoc('test', id)).toEqual({
		name: 'someone',
		age: '20',
		Relation: {},
	});
	pdb.deleteDoc('test', id);
});

test('Creating custom doc, reading it and Deleting it', () => {
	pdb.setDoc('test', 'a', { name: 'someone', age: '18' });
	expect(pdb.getDoc('test', 'a')).toEqual({
		name: 'someone',
		age: '18',
		Relation: {},
	});
	pdb.deleteDoc('test', 'a');
});

test('Searching for Docs', () => {
	pdb.setDoc('test', 'a', { name: 'Max', age: '18' });
	pdb.setDoc('test', 'b', { name: 'someone', age: '18' });
	pdb.setDoc('test', 'c', { name: 'someone', age: '19' });
	const max = pdb.findDoc('test', 'name', 'Max');
	const ages = pdb.findAll('test', 'age', '18');
	expect(max).toEqual('a');
	expect(ages).toEqual(['a', 'b']);
});

test('Adding, reading and deleting Relations', () => {
	const id1 = pdb.addDoc('test', { name: 'Father', age: '50' });
	const id2 = pdb.addDoc('test', { name: 'someone', age: '18' });
	pdb.setRel('test', id2, 'Father', id1);
	pdb.setRelGrp('test', id1, 'Son', id2);
	expect(pdb.getRel('test', id1, 'Son')).toEqual([id2]);
	expect(pdb.getRel('test', id2, 'Father')).toEqual(id1);
	pdb.deleteRel('test', id1, 'Son');
	pdb.deleteRel('test', id2, 'Father');
});

test('Delete Db', () => {
	pdb.deleteDb('test');
	expect(() => {
		pdb.deleteDb('test');
	}).toThrowError("DB Doesn't exist");
});
