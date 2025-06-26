const { execSync } = require('child_process');

if (process.env.CI !== 'true') {
    execSync('npx simple-git-hooks', { stdio: 'inherit' });
}
