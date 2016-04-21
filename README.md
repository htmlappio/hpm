Hpm - the package manager for html apps
=======================================


Installation
-----------

Install with bower: `bower install hpm --save`

Setup the necessary dependencies in index.html:

```
  <script src="./bower_components/ydn.db/jsc/ydn.db-dev.js"></script>
  <script src="./bower_components/bluebird/js/browser/bluebird.min.js"></script>
  <script src="./bower_components/lodash/lodash.min.js"></script>
  <script src="./bower_components/helpersjs/helpers.js"></script>
  <script src="./bower_components/odsync/index.js"></script>
  <script src='./bower_components/hpm/hpm.js'></script>
```

Now is hpm ready to use. Start with opening the developer console and
type: `hpm.help()`.


Usage
-----


**THIS IS WORK IN PROGRESS**

Definition of a package, use JSON? This is the format used by bower (and also
by npm):

    {
      "name": "hpm",
      "version": "0.0.1",
      "authors": [
        "Jonas Colmsjö <jonas.colmsjo@gizur.com>"
      ],
      "description": "Htmlapp package manager",
      "main": "hpm.js",
      "keywords": [
        "htmlapp",
        "package",
        "manager"
      ],
      "license": "MIT",
      "dependencies": {
        "odsync": "~0.1.0"
      }
    }

Use an account at odata.gizur.com for storing packages. The authentication
here limits updates of the package in a good way.
