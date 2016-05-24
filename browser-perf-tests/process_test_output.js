/*
 Johnny Pesola 2016-05-24
 */

// Require dependencies
var util = require('util');

// Settings
var OUT_FILE = './test_output/data.json';

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
          numberOftestsDone: numberOfTestForBrowser,
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

// Init tests
(function runTest( i ) {

  var processedData = getProcessedData( OUT_FILE );

  console.log( util.inspect( processedData, false, null ) );

}( 0 ));
