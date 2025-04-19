const cli = document.getElementById("cli");
const inputLine = document.getElementById("inputLine");

// Load symbolic memory once
let memory = {};

// Load .txt files into memory
async function loadMemory() {
  const files = [
    "new_symbolic_swarm_named.txt",
    "swarm_personality.txt",
    "symbolic_swarm_wikipedia_quantum.txt"
  ];
  for (let file of files) {
    try {
      const res = await fetch(file);
      const data = await res.json();
      if (data.code) {
        memory[file] = data.code.toLowerCase();
      }
    } catch (e) {
      memory[file] = "Error loading " + file;
    }
  }
}

// Display response in the CLI
function respond(text) {
  cli.innerHTML += `<div>> ${text}</div>`;
  const lower = text.toLowerCase();
  let matched = [];

  for (const [file, content] of Object.entries(memory)) {
    const query = lower.split(":")[1]?.trim();
    if (query && content.includes(query)) {
      matched.push(`↳ Match in ${file}`);
    }
  }

  if (matched.length === 0) matched.push("↳ No match found.");
  matched.forEach(m => cli.innerHTML += `<div>${m}</div>`);
  cli.scrollTop = cli.scrollHeight;
}

// Listen for Enter key to submit command
inputLine.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const input = inputLine.value;
    respond(input);
    inputLine.value = "";
  }
});

loadMemory();
