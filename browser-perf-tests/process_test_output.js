/*
 Johnny Pesola 2016-05-24
 */

// Require dependencies
var util = require('util');
var fs = require('fs');
var colors = require('colors/safe');

// Get arguments
var args = process.argv.slice(2);

if( args.length === 0) {
  console.log( colors.red('Please provide data filename. Example: npm run process data-123123123.json \n\n') );
  return false;
}

// Settings
var IN_FILE = './test_output/' + args[0] ;
var PROCESSED_OUT_FILE = 'test_output/' + args[0].split('.json')[0] + '-processed.json';

function getNumberOfTestsForBrowser( browserObj ) {

  var firstPropKey = Object.keys( browserObj )[0];

  return browserObj[firstPropKey].length
}

function isNumber( obj ) {
  return !isNaN(parseFloat(obj)) 
}

// Actual test code
function getProcessedData(jsonSourceFile ) {

  // console.log( 'Calculating average values for json file: %s', jsonSourceFile );
  
  // Open file
  var dataObj = require( jsonSourceFile );
  
  var frameWorkArray = [];
  var browserArray, testPropArray, frameWorkObj, browserObj, testProps, numberOfTestForBrowser;

  // Iterate through frameworks
  for ( var frameWorkName in dataObj ) {

    // Reset / init values.
    frameWorkObj = dataObj[frameWorkName];
    browserArray = [];

    // Iterate through browsers
    for ( var browserName in frameWorkObj ) {

      // Reset / init values.
      browserObj = frameWorkObj[browserName];
      testPropArray = [];

      numberOfTestForBrowser = getNumberOfTestsForBrowser( browserObj );

      // Iterate through tested properties
      for ( var testPropName in browserObj ) {

        testProps = browserObj[testPropName]

        if( isNumber( testProps[0] ) ) {

          var sum = testProps.reduce(function (prevPropTestValues, propTestValues) {

            return prevPropTestValues + propTestValues;
          });

          // Calculate values of interest
          var average = sum / testProps.length;
          var max = Math.max.apply(null, testProps);
          var min = Math.min.apply(null, testProps);

          testPropArray.push(
            {
              testPropertyName: testPropName,
              average: average,
              max: max,
              min: min,
              sum: sum
            }
          )
        }
      }

      browserArray.push(
        {
          browserName: browserName,
          numberOfTestsDone: numberOfTestForBrowser,
          testProperties: testPropArray
        }
      )
    }

    frameWorkArray.push( {
      frameWorkName: frameWorkName,
      browsers: browserArray
    } )


  }

  return frameWorkArray;
}

function saveData( data, fileName ){

  // Write out test results
  fs.writeFileSync( fileName, JSON.stringify( data ) );

}

// Init tests
(function runTest( i ) {

  var processedData = getProcessedData( IN_FILE );

  saveData( processedData, PROCESSED_OUT_FILE );

  console.log( colors.green('File processed and saved to: ' + PROCESSED_OUT_FILE + '\n\n'));

}( 0 ));
