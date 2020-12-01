const child_process = require('child_process');

console.log(`Current environment is '${process.env.NODE_ENV}'`);

if(process.env.NODE_ENV === 'production') {
  child_process.spawnSync('python3 build-fonts.py');
} else {
  child_process.spawnSync('pipenv run python3 build-fonts.py');
}
