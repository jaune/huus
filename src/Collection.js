window.huus = window.huus || {};
window.huus.Collection = (function () {

var Cursor = window.huus.Cursor;
var Query = window.huus.Query;

var Collection = function () {
	this.id_prefix_ = Date.now().toString(36);
	this.id_counter_ = Math.round(42 * Math.random());
	
	this.counter_ = 0;
	this.documents_ = {};
};

Collection.prototype.generateId_ = function () {
	return this.id_prefix_+':'+Date.now().toString(36)+':'+(this.id_counter_++);
};

Collection.prototype.count =  function () {
	return this.counter_;
};

Collection.prototype.forEach = function (callback) {
	Object.keys(this.documents_).forEach(function (id) {
		this.callback(this.documents[id]);
	}, {
		documents : this.documents_,
		callback : callback
	});
};

Collection.prototype.findOne =  function (query) {
	var documents = this.find(query);
	if (documents.length <= 0) {
		return null;
	}
	return documents.pop();
};

Collection.prototype.find =  function (query) {
	var q = new Query();
	q.parse(query);

	var ids = Object.keys(this.documents_).filter(function (id) {
		return this.query.match(this.documents[id]);
	}, {
		documents : this.documents_,
		query: q
	});

	return ids.map(function (id) {
		return this.documents[id];
	}, {
		documents : this.documents_
	});
};

Collection.prototype.insert =  function (d) {
	var safe = null;
	try {
		safe = window.JSON.parse(window.JSON.stringify(d));
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
		safe._id = this.generateId_();
	}
	this.documents_[safe._id] = safe;
	this.counter_++;
	return safe;
};

return Collection;

})();
