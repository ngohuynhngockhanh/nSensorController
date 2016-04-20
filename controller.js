var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var php = require('phpjs');


var port = new SerialPort("COM10", {
	baudrate: 115200,
	parser: serialport.parsers.readline('\n')
});

port.on('data', function (data) {
	var array = data.split(" ");
	switch (array[0]) {
		case "SENSOR":
			var temp = phpjs.intval(array[3]) + (phpjs.intval(array[4]) / 100);
			console.log(temp);
			break;
	}
});