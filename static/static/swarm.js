
const files = [
  'new_symbolic_swarm_named.txt',
  'swarm_personality.txt',
  'symbolic_swarm_wikipedia_quantum.txt'
];
const log = document.getElementById('log');

async function loadSymbolic() {
  for (let file of files) {
    try {
      const res = await fetch(file);
      const data = await res.json();
      log.innerText += `\n[${file}]\n` + data.code.substring(0, 300) + '\n...';
    } catch (e) {
      log.innerText += `\n[ERROR] ${file}: ` + e.message;
    }
  }
}
loadSymbolic();
