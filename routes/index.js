var packageJson = require("package-json");
var rp = require("request-promise");
var _ = require("lodash");
var moment = require("moment");

var express = require('express');
var router = express.Router();

var packagesToCheck = [{
  name: "@unumux/ux-cli",
  cmd: "npm i -g @unumux/ux-cli",
  ghName: "unumux/ux-cli"
}, {
  name: "@unumux/ux-build-tools",
  cmd: "npm i --save-dev @unumux/ux-build-tools",
  ghName: "unumux/ux-build-tools"
}, {
  name: "@unumux/ux-questions",
  cmd: "npm i --save @unumux/ux-questions",
  ghName: "unumux/ux-questions"
}, {
  name: "@unumux/ux-debug",
  cmd: "npm i --save @unumux/ux-debug",
  ghName: "unumux/ux-debug"
}, {
  name: "@unumux/ux-get-paths",
  cmd: "npm i --save @unumux/ux-get-paths",
  ghName: "unumux/ux-get-paths"
}, {
  name: "@unumux/eslint-config-unumux",
  cmd: "npm i --save-dev @unumux/eslint-config-unumux",
  ghName: "unumux/eslint-config-unumux"
}, {
  name: "@unumux/stylelint-config-unumux",
  cmd: "npm i --save-dev @unumux/stylelint-config-unumux",
  ghName: "unumux/stylelint-config-unumux"
}, {
  name: "@unumux/update-hosts-ip",
  cmd: "npm i -g @unumux/update-hosts-ip",
  ghName: "unumux/update-hosts-ip"
}];

var cache = {
  packages: [],
  updated: null
}

var FIVE_MINUTES = 5 * 60 * 1000;

router.get('/', function(req, res) {
  if(cache.updated && ((new Date) - cache.updated) < FIVE_MINUTES) {
    renderPage(res);
  } else {
    updateCache().then(function() {
      renderPage(res);
    });
  }
});

function updateCache() {
  return new Promise(function(resolve, reject) {
    var githubPromise = rp({ 
      uri: "https://api.github.com/users/unumux/repos", 
      headers: { "User-Agent": "UnumUX" },
      json: true
    });
  
    var promises = packagesToCheck.map(function(package) {
      return packageJson(package.name);
    });
    
    promises.push(githubPromise);

    Promise.all(promises).then(function(packages) {
      var ghData = packages.pop();
      packages = packages.map(function(package, index) {
        var ghName = packagesToCheck[index].ghName;
        package.ghRepo = _.find(ghData, { full_name: ghName });
        package.cmd = packagesToCheck[index].cmd;
        
        return package;  
      });
      cache.packages = packages;
      cache.updated = new Date();
      resolve();
    });
  });
}

function renderPage(res) {
  res.render('index', {
    packages: cache.packages
  });
}

module.exports = router;