describe('huus.Collection.insert', function() {
	var collection;

	beforeEach(function() {
		collection = new huus.Collection();
	});

	it('insert invalid document', function() {
		expect(function () {
			collection.insert();
		}).toThrow();

		expect(function () {
			collection.insert(42);
		}).toThrow();
	});

	it('insert valid document', function() {
		var doc = collection.insert({});
		expect(doc._id).toBeDefined();
	});

	it('insert valid document with existing _id', function() {
		collection.insert({ _id : 'test1'});
		expect(function () {
			collection.insert({ _id : 'test1'});
		}).toThrow();
	});

});

describe('huus.Collection.find', function() {
	var collection;

	beforeEach(function() {
		collection = new huus.Collection();

		collection.insert({name: '0001', test : 'bob'});
		collection.insert({name: '1000'});
		collection.insert({name: 'f0f'});
	});

	it('simplest find', function() {
		var cursor = collection.find({ name : '0001'});
	});

});

describe('huus.Collection.count', function() {
	var collection;

	beforeEach(function() {
		collection = new huus.Collection();

		collection.insert({name: '0001', test : 'bob'});
		collection.insert({name: '1000'});
		collection.insert({name: 'f0f'});
	});

	it('Simplest count.', function() {
		expect(collection.count()).toEqual(3);
	});

});