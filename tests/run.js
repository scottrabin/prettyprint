// load up the tests

// load up dependencies
var fs = require( 'fs' ), vm = require( 'vm' );

// the sandbox to execute test scripts in
function PASS( msg ){
    console.log( " \u2714    : " + msg );
}
function FAIL( msg, exp, act ){
    console.log( " FAIL : " + msg );
    console.log( "        Expected:\n" + FAIL.INDENT + String(exp).replace( /\n/g, '\n'+FAIL.INDENT ) );
    console.log( "        Got:\n" + FAIL.INDENT + String(act).replace( /\n/g, '\n'+FAIL.INDENT ) );
}
FAIL.INDENT = '            ';
function run_test( test ){
    var act = ( typeof test.actual === 'function' ? test.actual() : test.actual ),
    exp = ( typeof test.expected === 'function' ? test.expected() : test.expected );

    if( act === exp ){
	PASS( test.name );
	return true;
    } else {
	FAIL( test.name, exp, act );
	return false;
    }
}

// get the files
var files = fs.readdirSync( './tests' ), js_regex = /(.*)\.js$/, match, test, passed;

// run the tests
for( var i = 0, l = files.length ; i < l ; ++i ){
    // file is a valid javascript file?
    if( null !== (match = files[i].match( js_regex ) ) ){
	test = require( './tests/' + match[1] );

	console.log( test.TEST_NAME + ":" );
	passed = 0;
	for( var j = 0, testlen = test.tests.length ; j < testlen ; ++j ){
	    passed += run_test( test.tests[j] ) ? 1 : 0;
	}

	console.log( "    Passed: " + passed + " / " + test.tests.length + " (" + (passed*100/test.tests.length) + "%)" );
    }
}