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

  // private vars
  // ===========

  var schema = {
    stores: [{
      name: 'apps',
      autoIncrement: false
    }]
  };

  var db = new ydn.db.Storage('htmlapps', schema);

  // hpm Class
  // =========

  // constructor
  var hpm = {};


  // Command line help, static functions on the App object
  // -----------------------------------------------------

  hpm.help = function (topic) {

    if (!topic) {
      info('-- Htmlapp package manager help --');
      info('* hpm.register(<package name>) - register a package in the remote registry.');
      info('* hpm.install(<package name>) - install a remote package locally.');
      return;
    }

  }

  // Export
  // ======

  window['hpm'] = hpm;

  debug('hpm is loaded.');

  // Introduction message
  // ====================

  info('Welcome to hpm - the package manager for Html apps!');
  info("Show the help with hpm.help()")

}());
