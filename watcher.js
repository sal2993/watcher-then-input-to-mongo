/*
* Yet Another Watcher Script.
*   Wrote this script as a Controller to take input from a 
*   file which will be constantly added to.
*   This script will take the last input to the file and add it
*   to a data base, in my case mongodb
*
* author: Sal C.
*/

var dlog = require('../models/daylog');
const fs = require("fs");
const readLastLines = require('read-last-lines');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_ENV);

fs.watch('target.txt', function() {
    readLastLines.read('./target.txt', 1)
    .then(function (lines) {
      var line = JSON.parse(lines);
      var log = new dlog({wakeup_time: line.wakeup_time,
          sleep_time: line.sleep_time,
          date_of_wake: line.date_of_wake});
      log.save(function(err) {
        if (err) console.log(err);
        else console.log("success");
      });
    });
});
console.log("Now watching target.txt for changes...");

