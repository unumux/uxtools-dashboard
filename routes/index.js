var packageJson = require("package-json");

var express = require('express');
var router = express.Router();

var packagesToCheck = [{
  name: "@unumux/ux-cli",
  cmd: "npm i -g @unumux/ux-cli"
}, {
  name: "@unumux/ux-build-tools",
  cmd: "npm i --save-dev @unumux/ux-build-tools"
}, {
  name: "@unumux/ux-questions",
  cmd: "npm i --save @unumux/ux-questions"
}, {
  name: "@unumux/ux-debug",
  cmd: "npm i --save @unumux/ux-debug"
}, {
  name: "@unumux/ux-get-paths",
  cmd: "npm i --save @unumux/ux-get-paths"
}, {
  name: "@unumux/eslint-config-unumux",
  cmd: "npm i --save-dev @unumux/eslint-config-unumux"
}, {
  name: "@unumux/stylelint-config-unumux",
  cmd: "npm i --save-dev @unumux/stylelint-config-unumux"
}, {
  name: "@unumux/update-hosts-ip",
  cmd: "npm i -g @unumux/update-hosts-ip"
}];



router.get('/', function(req, res) {
  var promises = packagesToCheck.map(function(package) {
    return packageJson(package.name);
  });

  Promise.all(promises).then(function(packages) {
    packages = packages.map(function(package, index) {
      package.cmd = packagesToCheck[index].cmd;
      return package;  
    });
        
    res.render('index', {
      packages: packages
    });
  });
});

module.exports = router;