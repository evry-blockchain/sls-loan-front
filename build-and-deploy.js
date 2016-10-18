require('shelljs/global');
var rimraf = require('rimraf');
// var conf = require('./package.json');

console.log('Removing tmp and client dist folders...');

rimraf('.tmp', () => {
  console.log('Done');

  console.log('Build and copy files...');
  mkdir('-p', '.tmp/server');

  exec('cp server .tmp -r');

  exec('babel server --out-dir .tmp/server');

  cp('README.md', '.tmp/README.md');
  cp('package.json', '.tmp/package.json');

  cd('.tmp');
  console.log("Building archive and deploying the app...");
  exec('slc build -p');

  //deploy here
  exec('slc deploy -s sls-loan-node http://vagrant:vagrant@195.250.62.53:8701');

  console.log('Done');
});
