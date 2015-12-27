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
  hpm.getConfig = function () {
    var db = new ydn.db.Storage('config', {
      stores: [{
        name: 'backend',
        autoIncrement: false
      }]
    });

    return db.get('backend', 'config').then(function (cfg) {
      if (!cfg || !cfg.url || !cfg.email ||  !cfg.accountId ||  !cfg.password)
        throw 'ERROR; url, email, accoundId and password must be configured, ' +
        'see hpm.help("config")';
      return cfg;
    })
  };

  hpm.create = function (packageDef, html, css, js, workStore) {
    var db;

    if (!packageDef)
      throw "ERROR: packageDef must be specified!";

    if (!workStore) workStore = "work";

    return hpm.getConfig()
    .then(function(cfg){

      db = new ydn.db.Storage(cfg.accountId, {
        stores: [{
          name: 'buckets',
          autoIncrement: false
        }, {
          name: workStore,
          autoIncrement: false
        }]
      });

      var ps = [db.get(workStore, packageDef)];
      if (html) ps.push(db.get(workStore, html));
      if (css) ps.push(db.get(workStore, css));
      if (js) ps.push(db.get(workStore, js));

      return Promise.all(ps);

    })
    .then(function(data){

      var d = {
        packageDef: data[0],
        html: data[1].v,
        css: data[2].v,
        js: data[3].v
      };

      if(!d.packageDef.name || !d.packageDef.description || !d.packageDef.version)
        throw 'ERROR: package definition file missing mandatory fields, ' +
          'see hpm.help("create") for more information.';

      return db.put("buckets", d, 'b_' + d.packageDef.name + '-' + d.packageDef.version);
    })

  };

  // Command line help, static functions on the App object
  // -----------------------------------------------------

  hpm.help = function (topic) {

    var footer = '\n\n-----\nSee hpm.help("config") for how to setup the database connection.';

    if (!topic) {

      var msg =
        '-- Htmlapp package manager help --' +
        '\n\n* hpm.help("config") - show setup help' +
        '\n* hpm.help("create") - help with creating packages' +
        '\n* hpm.help("work") - working with files' +
        '\n\n* hpm.create(package_def_file, html_file, css_file, js_file, [work_store]) - create new package or update existing package.' +
        '\n* hpm.sync() - uppdat registry med public packages, varna om name är upptaget' +
        '\n* hpm.register(name) - spara rad i b_packages: <account_id>, app id' +
        '\n* hpm.fetch(name, [version]) - kolla att name finns, spara rad i b_packages, hämta vid nästa sync' +
        '\n* hpm.search(keywords) - lista packages som matchar, registry endast remote, ej lokalt?';

      info(msg);

      return;
    }

    if (topic === 'config') {
      var msg = 'A little configuration needs to be done before hpm can be used:' +
        '\nvar config = {' +
        '\n\turl: "http://localhost:9000/", ' +
        '\n\temail: "joe@example.com"' +
        '\n};' +
        '\nvar db = new ydn.db.Storage("config", {stores: [{ name: "backend", autoIncrement: false }]});' +
        '\nOdata.createAccount(config.url, config.email)' +
        '\n.then(function(res){' +
        '\n\tconfig.accountId = res.data.d.accountId;' +
        '\n\treturn Odata.resetPassword(config.url, config.accountId, config.email); ' +
        '\n})' +
        '\n.catch(function(err){' +
        '\n\terror(err);' +
        '\n})' +
        '\nconfig.password = "check the mail for a password";' +
        '\ndb.put("backend", config, "config");';

      info(msg);
    } else if (topic === 'create') {
      var msg =
        'Your packages are saved in a database with the same name as your accountid and the ' +
        '\nobject store named buckets. The key for each packet is b_<package name>-<version>' +
        '\nwhere <version> should be in the format X.Y.Z, e.g. 1.0.0, using so called ' +
        '\nsemantic versions, see semver.org' +
        '\n\nThis is an example of a package definition file is created:' +
        '\n\ndb.put("work", { ' +
        '\n\t   name: ... ,' +
        '\n\t    description: ... ,' +
        '\n\t    version: ... ,' +
        '\n\t    private: ... ' +
        '\n\t    permissions: ... ' +
        '\n\t    dependecies: ... (currently only for information, these needs to be fetched manually)' +
        '\n\t  }, "mypackage.json");' +
        '\n\nThen create the package like this:' +
        '\n\nhpm.create(package_def_file, html_file, css_file, js_file, [work_store])' +
        footer;

      info(msg);
    } else if (topic === 'work') {
      var msg =
        'Open a database connection that can be used for files we work on:' +
        '\n\nvar db; ' +
        '\nhpm.getConfig().then(function(cfg){' +
        '\n\tdb = new ydn.db.Storage(cfg.accountId, ' +
        '\n\t\t{stores: [{ name: "work", autoIncrement: false },' +
        '\n\t\t{ name: "buckets", autoIncrement: false }]}' +
        '\n\t);' +
        '\n});' +
        '\n\nUse this simple Hello World app to test that everything works:' +
        '\n\nvar html = "<htlm><body><h1>Hello World</h1></body></html>"' +
        '\nvar js = "init = function() { console.log(\'init function\');};"' +
        '\nvar css = "body {background: rgba(234, 159, 195, 0.8);}"' +
        '\ndb.put("work", {v: html}, "hello.html");' +
        '\ndb.put("work", {v: css}, "hello.css");' +
        '\ndb.put("work", {v: js}, "hello.js");';

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
