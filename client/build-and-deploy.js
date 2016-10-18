require('shelljs/global');

exec('npm run build');

cp('server.js', 'dist/server.js');
cp('package.json', 'dist/package.json');
cd('dist');
exec('slc build -p');

exec('slc deploy -s sls-loan-front http://vagrant:vagrant@195.250.62.53:8701');
