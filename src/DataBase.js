window.huus = window.huus || {};
window.huus.DataBase = (function () {

var Collection = window.huus.Collection;

var DataBase = function () {
	this.collections_ = {};
};

DataBase.prototype.getCollection =  function (name) {
	if (!this.hasCollection_(name)) {
		return this.createCollection_(name);
	}
	return this.collections_[name];
};

DataBase.prototype.hasCollection_ =  function (name) {
	return this.collections_.hasOwnProperty(name);
};

DataBase.prototype.createCollection_ =  function (name) {
	if (this.hasCollection_(name)) {
		throw new Error('Collection `'+name+'` already exists.');
	}
	if (typeof this[name] !== 'undefined') {
		throw new Error('`'+name+'`: invalid collection name.');
	}
	var collection = new Collection();
	Object.defineProperty(this, name, {
		'value': collection
	});
	return this.collections_[name] = collection;
};

return DataBase;

})();
