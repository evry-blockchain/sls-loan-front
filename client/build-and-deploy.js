require('shelljs/global');
let port = process.argv.slice(2)[0];
let credsMap = require('../creds.map');

let creds = credsMap[port];

exec('npm run build');

cp('server.js', 'dist/server.js');
cp('package.json', 'dist/package.json');

cd('dist');
exec('slc build -p');

exec(`slc deploy -s sls-loan-front http://${creds}@195.250.62.${port}:8701`);
