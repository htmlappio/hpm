Hpm - the package manager for html apps
=======================================

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

Use an account at odata.gizur.com for storing packages. This limits
updates of the package in a good way.

Commands to implement:

* Hpm.register(<package def file>, <account id>) - register a package in the remote registry
* Hpm.install(<package name>) - install a remote package locally
* Hpm.search(<keywords>) - search for remote packages
* Hpm.info(<package name>) - show information about package
