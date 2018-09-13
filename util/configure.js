'use strict';

var query = process.argv[2];

var fs = require('fs');
var path = require('path');

var baseDir = path.resolve(__dirname, '../');
var releaseDir = path.join(baseDir, 'build', 'deps');

var isWin = /^win/.test(process.platform);
var isLinux = /linux/.test(process.platform);

// Skip running this if we are running on a windows system
if (isWin) {
  process.stderr.write('Skipping run because we are on windows\n');
  process.exit(0);
}

var childProcess = require('child_process');

try {
  //for linux we want to ensure we'll find the desired libkafka.so.1 file. To do this we'are going to tell librdkafka++.so.1 to look in its current path at runtime as an additional location to search for libraries.
  var ENVVARS = isLinux ? "LDFLAGS='-Wl,-rpath,$ORIGIN' " : ""
  childProcess.execSync(ENVVARS +  "./configure --prefix=" + releaseDir + ' --libdir=' + releaseDir, {

  cwd: baseDir,
    stdio: [0,1,2]
  });
  process.exit(0);
} catch (e) {
  process.stderr.write(e.message + '\n');
  process.exit(1);
}
