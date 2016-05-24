/*
  Johnny Pesola 2016-05-22
  Based on code by Mr. Parashuram (http://blog.nparashuram.com/)
 */

// Require dependencies
var browserPerf = require('browser-perf');
var fs = require('fs');
var blogActions = require( './test_actions/blog-actions.js' );

// Settings
var URLS = {
  reactRouterRedux: 'http://localhost:8000/',
  angular: 'http://localhost:8001/'
}
var FRAMEWORKS = Object.keys( URLS );
var OUT_FILE = 'test_output/data-' + (new Date).getTime() + '.json';
var TIMES_TO_REPEAT_TEST = 100;
var WINDOW_HEIGHT = 768
var WINDOW_WIDTH = 1024

var BROWSER_PERF_OPTIONS = {
  selenium: 'http://localhost:4444/wd/hub',
  browsers: [
    {
      browserName: 'chrome',
      chromeOptions: {
        args: [
          '--window-size=' + WINDOW_WIDTH + ',' + WINDOW_HEIGHT,
          '--window-position=0,0',
          '--enable-memory-benchmarking',
          '--enable-benchmarking',
          '--memory-metrics'
        ]
      }
    },
    {
      browserName: 'firefox'
    }
  ],
  actions: [
    blogActions()
  ]
}

// Write file if needed
if ( !fs.existsSync( OUT_FILE ) ) {
  fs.writeFileSync( OUT_FILE, JSON.stringify( {} ) );
}

// Actual test code
function repeatTest( framework, callBack ) {

  console.log( 'Running test for %s', framework );

  // Will be iterated until TIMES_TO_REPEAT_TEST number of times is reached.
  (function iterate(i) {
    if ( i >= TIMES_TO_REPEAT_TEST ) {
      console.log( 'All tests done for %s', framework );
      callBack();
      return;
    }

    console.log('[%d|%d]', i, TIMES_TO_REPEAT_TEST);

    // Perform actual test
    browserPerf( URLS[framework], function( err, result ) {

      var data;

      // Output error if there was a error.
      if ( err ) {
        console.error( err );

      // No error found. Proceed
      } else {

        // Fetch data from file
        data = JSON.parse( fs.readFileSync( OUT_FILE ) );

        // Init framework object if needed
        if ( typeof data[framework] === 'undefined' ) {
          data[framework] = {};
        }

        // Loop through browserPerf test results
        result.forEach( function( res ) {

          var browserName = res._browserName;

          if( typeof data[framework][browserName] === 'undefined' ) {
            data[framework][browserName] = {}
          }

          for ( var metric in res ) {

            // Init metric array if needed
            if ( typeof data[framework][browserName][metric] === 'undefined' ) {
              data[framework][browserName][metric] = [];
            }

            // Push metric data to data array
            data[framework][browserName][metric].push( res[metric] );
          }
        });

        // Write out test results
        fs.writeFileSync( OUT_FILE, JSON.stringify(data) );
      }

      // Iteration occurs here!
      iterate( i + 1 );

    }, BROWSER_PERF_OPTIONS );

  }( 0 ));
}

// Init tests
(function runTest( i ) {

  // If all tests are done
  if ( i >= FRAMEWORKS.length ) {
    console.log( 'All tests done') ;
    return;
  }

  // Run tests, give callback with reference to self for iteration
  repeatTest( FRAMEWORKS[i], function() {
    runTest( i + 1 );
  });
}( 0 ));
