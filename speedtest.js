/* Speed testing utility class - runs on average executions 
	
	testImplement - This will be the specific code we want to
		test for performance speed. We'll encapsulate it all
		within its own function later
	testParams - This represents whatever parameters our test
		code needs in order to work correctly. Might be an 
		array of values, or it might be a single value.
	repetitions - number of times the code should be repeated.
		The higher the repetitions, the more reliable our
		average speed is. Defaults to 10.000

	Usage: wrap the code you want to test in an anonymous 
		funtion and pass it to a new instance of SpeedTest.
		Pass any necessary params to testParams. - If the
		tested code requires a list of params, create in the
		anonymous function a listOfParams param and pass in the
		params as an array, then in your function treat the array
		to assign the params as needed.
		Run SpeedTest.startTest and see the results.

	Example:
		var a = [ *... tons of items ...* ];
		var b = [ *... other tons of items ...* ];
		var listsForTests = [a,b];
		
		// This is the code we want to test, wrapped in a function and 
		// adjusted to work with an array of params passed in as a single
		// param
		var codeToTest = function ( listForTests ) {
			for (var i = 0; i < listForTests[0].length; i++) {
				// Do some magic, complex, evil code here
			}
		};
		var speedTest = new SpeedTest(codeToTest, listsForTests);
		speedTest.startTest();
*/

function SpeedTest(testImplement, testParams, repetitions) {
	this.testImplement = testImplement;
	this.testParams = testParams;
	this.repetitions = repetitions || 10000;
	this.average = 0;
}

SpeedTest.prototype = {
	startTest: function() {
		var beginTime, endTime, sumTimes = 0;
		for (var i = 0, x = this.repetitions; i < x; i++) {
			beginTime = +new Date();
			try	{
				this.testImplement(this.testParams)	
			} catch (error) {
				if (error instanceof ReferenceError) {
					console.log("Ups... something went wrong. Check your passed in params or function: " + error);
				} else if (error instanceof TypeError) {
					console.log("Ups... something went wrong. Check for an overwrite: " + error);
				} else {
					console.log("Ups.. something is wrong with the passed in function: " + error);	
				}
			}
			endTime = +new Date();
			sumTimes += endTime - beginTime;
		}
		this.average = sumTimes / this.repetitions;
		return console.log("Average execution across " + 
			this.repetitions + ": " + this.average);
	}	
}