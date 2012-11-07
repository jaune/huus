window.huus = window.huus || {};
window.huus.Collection = (function () {

var Cursor = window.huus.Cursor;
var Query = window.huus.Query;

var Collection = function () {
	this.index_prefix_ = Date.now().toString(36);
	this.index_counter_ = Math.round(42 * Math.random());
	
	this.documents_ = {};
};

// Set.prototype.items_ = {};

Collection.prototype.find =  function (query) {

	var q = new Query();
	q.parse(query);

	var ids = Object.keys(this.documents_).filter(function (id) {
		return this.query.match(this.documents[id]);
	}, {
		documents : this.documents_,
		query: q
	});

	console.debug(ids);

	return ids.map(function (id) {
		return this.documents[id];
	}, {
		documents : this.documents_
	});
};

Collection.prototype.generateIndex = function () {
	return this.index_prefix_+':'+Date.now().toString(36)+':'+(this.index_counter_++);
};

Collection.prototype.insert =  function (d) {
	var s = window.JSON.stringify(d);
	var safe = null;
	try {
		safe = window.JSON.parse(s);
	} catch (error) {
		throw new TypeError('TODO');
	}
	if (!(safe instanceof Object)) {
		throw new TypeError('TODO');
	}
	if (safe.hasOwnProperty('_id')) {
		if (this.documents_.hasOwnProperty(safe._id)) {
			throw new TypeError('TODO');
		}
	} else {
		safe._id = this.generateIndex();
	}
	this.documents_[safe._id] = safe;
	this.index_counter_++;
	return safe;
};


return Collection;

})();
