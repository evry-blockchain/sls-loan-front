require('shelljs/global');

exec('npm run build');

cp('server.js', 'dist/server.js');
cp('package.json', 'dist/package.json');
// exec('cp node_modules dist/node_modules -r');

cd('dist');
exec('slc build -p');

exec('slc deploy -s sls-loan-front http://vagrant:oUVJ7ipL9U@195.250.62.73:8701');
