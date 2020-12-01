const child_process = require('child_process');

console.log(`Current environment is '${process.env.NODE_ENV}'`);

if(process.env.NODE_ENV === 'production') {
  child_process.spawnSync('pip3 install -p');
} else {
  child_process.spawnSync('pipenv install');
}
