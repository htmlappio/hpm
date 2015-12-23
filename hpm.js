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

  // hpm Class
  // =========

  // constructor
  var hpm = {};

  // NOTE: Should create a proper class, perhaps as a singleton???
  hpm.getSetup = function() {
    var db = new ydn.db.Storage('config', {
      stores: [{ name: 'backend', autoIncrement: false }]
    });

    return db.get('backend', 'setup');
  };

  hpm.create = function(packageDef, html, css, js, workStore) {
    var db = new ydn.db.Storage('config', {
      stores: [{ name: 'backend', autoIncrement: false },
               { name: workStore, autoIncrement: false }]
    });

    var d = {};
    Promise.all([
      {d.package_def = db.get(package_def_file);}
      {d.html = db.get(html_file)}
      {d.css = db.get(css_file) }
      {d.js = db.get(js_file ) }
    ]).then(func(res) {db.put(b_) })
    
  };

  // Command line help, static functions on the App object
  // -----------------------------------------------------

  hpm.help = function (topic) {

    if (!topic) {
      info('-- Htmlapp package manager help --');
      info('* hpm.help("setup") - show setup help');
      info('* hpm.register(<package name>) - register a package in the remote registry.');
      info('* hpm.install(<package name>) - install a remote package locally.');

      var msg =
        'create(package_def_file, html_file, css_file, js_file, work_store) - overwrite existing, check version?' +
        'load(name, [version]) - take latest version if not specified' +
        'sync() - uppdat registry med public packages, varna om name är upptaget' +
        'register(name) - spara rad i b_packages: <account_id>, app id' +
        'fetch(name) - kolla att name finns, spara rad i b_packages, hämta vid nästa sync' +
        'search(keywords) - lista packages som matchar, registry endast remote, ej lokalt?' ;

      info(msg);

      return;
    }

    if (topic === 'setup') {
      var msg = 'A little configuration needs to be done before hpm can be used:' +
        '\nvar setup = {' +
        '\n\turl: "http://localhost:9000/", ' +
        '\n\temail: "joe@example,com"' +
        '\n};' +
        '\nvar db = new ydn.db.Storage("config", {stores: [{ name: "backend", autoIncrement: false }]});' +
        '\nOdata.createAccount(setup.url, setup.email).then(function(res){' +
        '\n\tsetup.accountId = res.data.d.accountId; ' +
        '\n\tdb.put("backend", setup, "setup");' +
        '\n});'

      info(msg);
    }

    else if (topic === 'create') {
      var msg =
        'Your packages are save in a database named with your accountid and the ' +
        'store named bucket. The key for each packet is b_<package name>-<version>' +
        '<version> should be in the format X.Y.Z, e.g. 1.0.0, using so called ' +
        'semantic versions, see semver.org';

      info(msg);

      var msg =
        '\nvar buckets = new ydn.db.Storage(accountId, {stores: [{ name: "buckets", autoIncrement: false }]});' +
        '\ndb.put("buckets", { ' +
        '\n\t   name:' +
        '\n\t    description:' +
        '\n\t    version:' +
        '\n\t    private:' +
        '\n\t    misc info fields...' +
        '\n\t  }, "mypackage.json");' +
        '\n{ package_def: {...},' +
        '\n\t  html: "",' +
        '\n\t  css: "",' +
        '\n\t  js: "" }';

      info(msg);
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
