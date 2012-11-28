window.huus = window.huus || {};
window.huus.Cursor = (function () {

var Cursor = function (collection, query) {
	this.query_ = query;
	this.collection_ = collection;

	this.result_ = null;

	this.offset_ = 0;
};

Object.defineProperty(Cursor.prototype, 'current', {
	get: function () {
		return this.getCurrent();
	}
});

Object.defineProperty(Cursor.prototype, 'length', {
	get: function () {
		return this.count();
	}
});

Cursor.prototype.count = function () {
	var counter = 0;
	return 1;
};

Cursor.prototype.getCurrent = function () {
	return 1;
};


Cursor.prototype.forEach = function (callback, self) {

};



return Cursor;

})();
