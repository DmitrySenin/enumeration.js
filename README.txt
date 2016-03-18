EnumerationJS is simple implementation of enumeration in JavaScript.

1. Usage

	1.1. Include

		To include the library in browser code just create script tag:
			<script type="text/javascript" src="<path to EnumerationJS file>">

	1.2. Create new enumeration

		If your use the library under browser than window object has enumeration object that was be created by library.
		So now you can create your own enumeration object:
		var Color = enumeration.create();
		Color is constructor now which takes Id and Name of enumeration's item.

	1.3. Create enumeration's items.

		To create new item just write code like below:
		var Red = Color(0, 'Red');
		var Blue = Color(1, 'Blue');

		Red and Blue are frozen objects that represent enumeration's items. Frozen means that after creation you can't change its properties.

	1.4. Items comparison.

		After creation of several items of enumeration you can compare it with each other using built-in CompareTo method:
		Red.CompareTo(Blue); // -1
		Red.CompareTo(Red); // 0
		Blue.CompareTo(Red); // 1

		Standard CompareTo behavior compares uniques identifiers of enumeration's items.
		The comparing method returns:
			a. Negative numeric value if comparing item's Id less than Id of compared item.
			b. Zero if items' Ids are equal.
			c. Positive numeric value if comparing item's Id greater than compared item's Id.

	1.5. Restrictions

		Enumeration object has built-in check of unique identifiers.
		So you can't create several items with one Id.

		var Red = Color(0, 'Red');
		var Blue = Color(0, 'Blue'); // !!throws Error!!

2. Extensions

All that said above is simple usage of EnumerationJS. 
If you want that your enumeration's items have additional properties, methods and so on then this chapter for you.

	2.1. Add properties

		a. Create enumeration instance:
			var BaseEnum = enumeration.create();
		b. Create special constructor of your enumeration:
			function Color(id, name, hexCode) {
				BaseEnum.apply(this, id, name);
				this.hexCode = hexCode;
				BaseEnum.maybeFreeze(this, Color); // this is necessary to freeze object if it's created by Color-constructor.
			}
			It must give id and name as parameters.
		c. Set prototype:
			Color.prototype = Object.create(BaseEnum);
			Color.constructor = Color; // don't forget this!!!

		Now all Color enumeration's items have additional property hexCode:
			var Red = new Color(0, 'Red', 'ff0000'); 