var packageJson = require("package-json");

var express = require('express');
var router = express.Router();

var packagesToCheck = [
  "@unumux/ux-cli",
  "@unumux/ux-build-tools",
  "@unumux/ux-questions",
  "@unumux/ux-debug",
  "@unumux/ux-get-paths",
  "@unumux/eslint-config-unumux",
  "@unumux/stylelint-config-unumux",
  "@unumux/update-hosts-ip"
];


router.get('/', function(req, res) {
  var promises = packagesToCheck.map(function(package) {
    return packageJson(package, "latest");
  });
  
  Promise.all(promises).then(function(packages) {
    res.render('index', { packages: packages });    
  });
});

module.exports = router;
