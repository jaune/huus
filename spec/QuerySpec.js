describe('huus.Query.parse', function() {
	var query;

	beforeEach(function() {
		query = new huus.Query();
	});

	it('Unjsonizable `query`.', function() {
		expect(function () {
			query.parse(document.createElement('CANVAS'));
		}).toThrow('Unjsonizable `query`.');
	});

	it('Invalid argument `query`.', function() {
		expect(function () {
			query.parse(3);
		}).toThrow('Invalid argument `query`.');
	});

	it('Simple query.', function() {
		query.parse({name : 'test'});
		query.parse({name : 3});
		query.parse({name : true});
	});

	it('Invalid key(s).', function() {
		expect(function () {
			query.parse({$name : 'test'});
		}).toThrow('Invalid key(s).');

		expect(function () {
			query.parse({'s.name' : 'test'});
		}).toThrow('Invalid key(s).');
	});

	it('Invalid value(s).', function() {
		expect(function () {
			query.parse({name : {}});
		}).toThrow('Invalid value(s).');

		expect(function () {
			query.parse({name : []});
		}).toThrow('Invalid value(s).');
	});
});

