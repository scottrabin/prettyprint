PrettyPrint.js
==============

A compact module that provides modifiable methods for creating human-readable forms of JSON objects.

Installation
------------

In the root of your project directory...
```@mkdir node_modules && cd node_modules && git clone http://github.com/scottrabin/prettyprint.git```

Usage
-----

In your script, you can use:
    var prettyprint = require( 'prettyprint' ).prettyprint;
    var some_object = { a: [ 5, 10 ], b: "A string", c: true };
    prettyprint.prettyprint( some_object );
which will return this string:
    {
        a: [
            5,
            10
           ],
        b: "A string",
	c: true
    }

The ```prettyprint``` function takes parameters ```object, [depth], [indent]```
```object```: the Javascript object to convert to pretty print
```[depth]```: the recursion depth for nested objects and arrays (default: prettyprint.DEFAULT_DEPTH)
```[indent]```: the indent level for multiline prettyprint return values (default: 0)

Customization Options
---------------------

PrettyPrint.js can be customized by modifying a number of the module export values.
```prettyprint.DEFAULT_DEPTH```: The recursion depth for nested objects/arrays before truncating the output to the string returned by ```Object.prototype.toString.call( some_obj );``` [default: 3]
```prettyprint.INDENT_VALUE```: The string to repeat for indented objects. [default: '    ', 4 spaces]
```prettyprint.OBJECT_INLINE_THRESHOLD```: Objects with this or fewer properties will be displayed on a single line. [default: 1]
```prettyprint.ARRAY_INLINE_THRESHOLD```: Arrays with this or fewer members will be displayed on a single line. [default: 1]

```prettyprint.format```: This object is keyed on the string returned by ```Object.prototype.toString.call( some_object )``` as ```function( object, depth, indent )``` and will return the prettyprint string representation of ```object```. If an object type is not defined, ```format``` will use the ```default``` function.

```prettyprint.truncate```: This object, like ```prettyprint.format```, is keyed on object type, but is used when the ```depth``` value is less than 0. Returns the normal value for Strings, Numbers, and Booleans, and defaults to the object type.