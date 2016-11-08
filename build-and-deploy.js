require('shelljs/global');
var rimraf = require('rimraf');
var port = process.argv.slice(2)[0];
var credsMap = {
  '76': 'blockchain:oUVJ7ipL9U',
  '68': 'vagrant:oUVJ7ipL9U',
  '73': 'vagrant:oUVJ7ipL9U'
};

var creds = credsMap[port];

console.log('Removing tmp and client dist folders...');

rimraf('.tmp', () => {
  console.log('Done');

  console.log('Build and copy files...');
  mkdir('-p', '.tmp/server');

  exec('cp server .tmp -r');

  exec('babel server --out-dir .tmp/server');

  cp('README.md', '.tmp/README.md');
  cp('package.json', '.tmp/package.json');
  cp('node_modules', '.tmp/node_modules');

  cd('.tmp');
  console.log("Building archive and deploying the app...");
  exec('slc build -p');

  //deploy here
  exec(`slc deploy -s sls-loan-node http://${creds}@195.250.62.${port}:8701`);
  exec(`slc ctl -C http://${creds}@195.250.62.${port}:8701 env-set sls-loan-node MYCREDS=mycreds${port}.json`);

  console.log('Done');
});
