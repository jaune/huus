describe('huus.DataBase.getCollection', function() {
	var db;

	beforeEach(function() {
		db = new huus.DataBase();
	});

	it('Access via getCollection.', function() {
		expect(function () {
			db.getCollection('products');
		}).not.toThrow();

		expect(function () {
			db.getCollection('getCollection');
		}).toThrow();
	});

	it('Access via property.', function() {
		expect(db.products).not.toBeDefined();

		var c = db.getCollection('products');
		
		expect(c).toBeDefined();

		expect(db.products).toBeDefined();

		expect(db.products).toEqual(c);
	});

	it('Not writable property.', function() {
		db.getCollection('products');

		db.products = null;

		expect(db.products).not.toEqual(null);
	});

	it('Insert via getCollection.', function() {
		var product = db.getCollection('products').insert({name:'test'});
		expect(product.name).toEqual('test');
	});

	it('Insert via property.', function() {
		db.getCollection('products');

		var product = db.products.insert({name:'test'});

		expect(product.name).toEqual('test');
	});

});
