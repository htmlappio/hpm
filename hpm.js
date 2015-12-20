// hpm.js
// Copyright Jonas Colmsjö 2015
//

;
(function () {
  var log = console.log.bind(console);
  var info = console.info.bind(console);
  var debug = console.debug.bind(console);
  var error = console.error.bind(console);

  debug('Initializing hpm - the package manager for html apps...');

  // imports
  // =======

  ODS = window['odsync'];

  // App Class
  // =========

  // constructor
  var Hpm = function (options) {};

  // Export
  // ======

  window['hpm'] = Hpm;

  debug('hpm is loaded.');

  // Introduction message
  // ====================

  info('Welcome to hpm!');
  info("Htmlapp let's you develop web and mobile apps easily. All you need is your web browser.");
  info("Show the help with Htmlapp.help()")

}());
