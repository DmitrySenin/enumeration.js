;(function(exports) {

	var message_list = {
		idNotNumeric : "Id should be numeric.",
		idExists : "Id should be unique"
	};

	/**
	 * Check that value is number or can be convert to number.
	 * @param  {Any}  val Checked value.
	 * @return {Boolean}  Result of checking.
	 */
	function isNumeric(val) {
		return !isNaN(parseFloat(val)) && isFinite(val);
	}

	/**
	 * Freeze object if it was be created passed constructor.
	 * @param  {Object} obj         Object to freeze.
	 * @param  {Function} constructor Function to compare with constructor of object.
	 */
	function maybeFreeze(obj, constructor) {
		if(obj.constructor === constructor) {
			Object.freeze(obj);
		}
	}

	/**
	 * Create new enumeration.
	 * @return {Function} Constructor of enumeration.
	 */
	function create() {

		var id_list = [];

		/**
		 * Constructor of enumeration.
		 * @param {String} name Name of enumeration's item.
		 * @param {Numeric} id   Unique identifier of item of enumeration.
		 */
		function Enumeration(name, id) {

			// if id was passed as parameter
			// then check it
			// else get last from id_list and increase it by one, or set 0 if no ids yet.
			if(arguments.length > 1) {
				if(!isNumeric(id)) {
					throw new Error(message_list.idNotNumeric);
				}

				if(id_list.indexOf(+id) >= 0) {
					throw new Error(message_list.idExists);
				}
			}
			else {
				id = id_list.length ? id_list[id_list.length - 1] + 1 : 0;
			}

			id_list.push(+id);

			this.id = +id;
			this.name = name + '';

			maybeFreeze(this, Enumeration);
		}

		/**
		 * Compare 'this' with another item of enumeration by Id.
		 * @param {Enumeration} enumItem Object to compare with.
		 * @return {Numeric} Negative value if 'this' less than given object.
		 *                            Positive value if 'this' greater than given object.
		 *                            Zero if 'this' equal to given object.
		 */
		Enumeration.prototype.CompareTo = function(enumItem) {
			return this.id - enumItem.id;
		}

		/**
		 * Convert item of enumeration to string.
		 * @return {String} String representation of enumeration's item.
		 */
		Enumeration.prototype.toString = function() {
			return this.name;
		}

		/**
		 * Convert item of enumeration to number.
		 * @return {Numeric} Numeric representation of enumeration's item.
		 */
		Enumeration.prototype.valueOf = function() {
			return this.id;
		}

		return Enumeration;
	};

	exports.enumeration = {
		create,
		maybeFreeze
	};

})(window);