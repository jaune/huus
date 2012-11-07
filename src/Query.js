window.huus = window.huus || {};
window.huus.Query = (function () {

var Query = function () {
	this.$eq_ = {};
};

Query.prototype.parse =  function (query) {
	var safe = null;
	try {
		safe = window.JSON.parse(window.JSON.stringify(query));
	} catch (error) {
		throw new TypeError('Unjsonizable `query`.');
	}
	if (!(safe instanceof Object)) {
		throw new TypeError('Invalid argument `query`.');
	}
	var invalid;

	invalid = Object.keys(safe).some(function (key) {
		return !((key.indexOf('$') === -1) && (key.indexOf('.') === -1));
	});
	if (invalid) {
		throw new TypeError('Invalid key(s).');
	}

	invalid = Object.keys(safe).some(function (key) {
		return !((typeof this[key] === 'boolean') || (typeof this[key] === 'string') || (typeof this[key] === 'number'));
	}, safe);
	if (invalid) {
		throw new TypeError('Invalid value(s).');
	}

	Object.keys(safe).forEach(function (key) {
		this.$eq_[key] = safe[key];
	}, this);

	
};

Query.prototype.match = function (subject) {
	var $eq = this.$eq_;
	var ok = true;

	Object.keys($eq).forEach(function (key) {
		if (subject.hasOwnProperty(key)) {
			if (subject[key] !== $eq[key]) {
				ok = false;
			}
		} else {
			ok = false;
		}
	});

	return ok;
};


return Query;

})();
