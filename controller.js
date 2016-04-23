var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var php = require('phpjs');


var port = new SerialPort("COM6", {
	baudrate: 115200,
	parser: serialport.parsers.readline('\n')
});

port.on('data', function (data) {
	var array = data.split(" ");
	switch (array[0]) {
		case "SENSOR":
			var temp = phpjs.intval(array[3]) + (phpjs.intval(array[4]) / 100);
			console.log(temp);
			if (temp >= 35) {
				port.write("DEVICE 2 1 1\n");
			} else 
				port.write("DEVICE 2 1 0\n");
			break;
		case "AT":
			console.log("AT " + array[1]);
			break;
		case "RAM":
			console.log("Free ram " + array[1]);
			break;
		default:
			break;
	}
});
/*
var state = 0;
port.on('open', function () {
	setInterval(function() {
		port.write("DEVICE 2 1 " + state + "\n");
		state = ++state % 2;
	}, 5);
	
});
*/