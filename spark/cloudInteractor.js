var spark = require("Spark");
var username = "email@example.com";
var pw = "password";
var sparkCommand = null;

module.exports = CloudInteractor;

// Basically just call CloudInteractor.sendCommand(cmd, param, callback)

var CloudInteractor = (function() {
	function sendCommand(cmd, params, callback) {
		sparkCommand.command = cmd;
		sparkCommand.params = params;
		sparkCommand.callback = callback;

		Spark.login({ username: username, password: pw });
	}

	return {
		sendCommand: sendCommand
	};
})();

spark.on('login', function() {
  // If login is successful we get and accessToken,
  // we'll use that to call Spark API ListDevices
  var devicesPr = spark.listDevices();

  devicesPr.then(
    // We get an array with devices back and we list them
    function(devices){
      console.log('API call List Devices: ', devices);

      // callback to be executed by each core
      var callback = function(err, data) {
        if (err) {
          console.log('An error occurred while getting core attrs:', err);
        } else {
          console.log('Core attr retrieved successfully:', data);
        }
      };

      // The function needs to be defined  in the firmware uploaded to the
      // the Spark core and registered to the Spark cloud, same thing we do
      // with variables. You pass along the name of the function and the params.
      spark.callFunction(devices[0].id, sparkCommand.command, sparkCommand.params, sparkCommand.callback);

      // Once you hvae a device/core instance you can use that to call functions on it.
      // The main difference between this and directly using the main `spark` instance is
      // that you no longer need to pass the id.
      var core = devices[0];
      core.callFunction(sparkCommand.command, sparkCommand.params, sparkCommand.callback);
    },
    function(err) {
      console.log('API call failed: ', err);
    }
  );
});