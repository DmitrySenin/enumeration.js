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
		 * @param {Numeric} id   Unique identifier of item of enumeration.
		 * @param {String} name Name of enumeration's item.
		 */
		function Enumeration(id, name) {

			if(!isNumeric(id)) {
				throw new Error(message_list.idNotNumeric);
			}

			if(id_list.indexOf(+id) >= 0) {
				throw new Error(message_list.idExists);
			}

			id_list.push(+id);

			this.id = +id;
			this.name = name + '';

			maybeFreeze(this, Enumeration);
		}

		return Enumeration;
	};

	exports.enumeration = {
		create,
		maybeFreeze
	};

})(window);