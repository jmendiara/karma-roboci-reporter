var http = require('http');

var RoboCIReporter = function(baseReporterDecorator, config) {
  var path = config.path;
  var success = true;

  baseReporterDecorator(this);

  this.onRunStart = function(browsers) {
    http.get(path+'?command=RUN');
  };

  this.onRunComplete = function() {
    if (!success){
      http.get(path+'?command=KO');
    } else {
      http.get(path+'?command=OK');
    }
  };

  this.specFailure = function(browser, result) {
    success = false;
  };
};

RoboCIReporter.$inject = ['baseReporterDecorator', 'config.roboCIReporter'];

// PUBLISH DI MODULE
module.exports = {
  'reporter:roboci': ['type', RoboCIReporter]
};