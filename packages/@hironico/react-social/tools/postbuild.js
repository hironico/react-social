const { exec } = require('child_process');
const rimraf = require("rimraf");

console.log('Start of POST build script');

console.log('Removing installed package from the sandbox app...');
process.chdir('../../../apps/sandbox/node_modules');
rimraf.sync('@hironico');

process.chdir('..');

console.log('Updating package in the sandbox web app...');
exec('npm install', (err, stdout, stderr) => {
    if (err) {
        // node couldn't execute the command
        console.log('Could not update package in the sandbox reference app using npm install.');
        console.log(stderr);
        return;
    }

    console.log(stdout);

    console.log('Building the sandbox web app with updated package...');
    exec('npm run build', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.log('Could not build the sandbox reference app using npm run build.');
            console.log(stderr);
            return;
        }
    
        console.log(stdout);

        console.log('End of POST build script.');
    });
});
