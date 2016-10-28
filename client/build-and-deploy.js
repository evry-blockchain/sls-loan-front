require('shelljs/global');
var port = process.argv.slice(2)[0];

exec('npm run build');

cp('server.js', 'dist/server.js');
cp('package.json', 'dist/package.json');

cd('dist');
exec('slc build -p');

exec(`slc deploy -s sls-loan-front http://vagrant:oUVJ7ipL9U@195.250.62.73:8701`);
