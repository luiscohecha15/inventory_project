const { spawn } = require('child_process');
const path = require('path');

function start(cmd, args, cwd) {
  const p = spawn(cmd, args, { cwd, shell: true, stdio: 'inherit' });
  p.on('exit', (code) => {
    console.log(`${cmd} exited with ${code}`);
  });
  return p;
}

const frontendDir = path.resolve(__dirname, '..');
const backendDir = path.resolve(__dirname, '..', '..', 'backend');

// Start backend in dev mode
start('npm', ['run', 'start:dev'], backendDir);

// Start frontend dev server
start('npm', ['run', 'dev'], frontendDir);

// Keep the process alive
process.stdin.resume();
