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

  // Command line help, static functions on the App object
  // -----------------------------------------------------

  Hpm.help = function (topic) {

    if (!topic) {
      info('-- Htmlapp package manager help --');
      info('* Hpm.register(<package name>) - register a package in the remote registry.');
      info('* Hpm.install(<package name>) - install a remote package locally.');
      return;
    }

  }

  // Export
  // ======

  window['Hpm'] = Hpm;

  debug('Hpm is loaded.');

  // Introduction message
  // ====================

  info('Welcome to Hpm - the package manager for Html apps!');
  info("Show the help with Hpm.help()")

}());
