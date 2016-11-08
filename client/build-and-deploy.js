require('shelljs/global');
var port = process.argv.slice(2)[0];
var credsMap = {
  '76': 'blockchain:oUVJ7ipL9U',
  '68': 'vagrant:oUVJ7ipL9U',
  '73': 'vagrant:oUVJ7ipL9U'
};

var creds = credsMap[port];

exec('npm run build');

cp('server.js', 'dist/server.js');
cp('package.json', 'dist/package.json');

cd('dist');
exec('slc build -p');

exec(`slc deploy -s sls-loan-front http://${creds}@195.250.62.${port}:8701`);
