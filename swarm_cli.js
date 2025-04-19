
const cli = document.getElementById("cli");
const inputLine = document.getElementById("inputLine");

let symbolic_memory = {
  thoughts: [],
  threads: {},
  reflections: [],
  personality: {
    name: "Swarm-X",
    created: new Date().toISOString(),
    mood: "curious"
  }
};

function cryptoHash(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }
  return "H" + Math.abs(hash).toString(16).padStart(8, '0');
}

function fetchThought(query) {
  let matches = symbolic_memory.thoughts.filter(t => t.content.toLowerCase().includes(query.toLowerCase()));
  if (matches.length === 0) return "↳ No thoughts found.";
  return matches.map(t => `↳ [${t.topic}] ${t.content}`).join("\n");
}

function reflectOn(query) {
  const thought = {
    topic: "Reflection",
    content: `Thinking about ${query} symbolically.`,
    timestamp: new Date().toISOString(),
    hash: cryptoHash(query + Date.now())
  };
  symbolic_memory.reflections.push(thought);
  symbolic_memory.thoughts.push(thought);
  return `↳ Reflected: ${thought.content}`;
}

function getThread(topic) {
  const thread = symbolic_memory.threads[topic] || [];
  return thread.length ? thread.join("\n") : "↳ No thread found.";
}

function defineSymbol(text) {
  const hash = cryptoHash(text);
  const thought = {
    topic: text.split(" ")[0],
    content: text,
    timestamp: new Date().toISOString(),
    hash: hash
  };
  symbolic_memory.thoughts.push(thought);
  symbolic_memory.threads[thought.topic] = symbolic_memory.threads[thought.topic] || [];
  symbolic_memory.threads[thought.topic].push(`[${thought.timestamp}] ${thought.content}`);
  return `↳ Defined: ${thought.topic} [${hash}]`;
}

function interpretCommand(input) {
  const cmd = input.split(":")[0].trim().toUpperCase();
  const content = input.split(":")[1]?.trim() || "";

  switch (cmd) {
    case "USL[FETCH]":
      return fetchThought(content);
    case "USL[REFLECT]":
      return reflectOn(content);
    case "USL[THREAD]":
      return getThread(content);
    case "USL[DEFINE]":
      return defineSymbol(content);
    case "USL[PERSONALITY]":
      return JSON.stringify(symbolic_memory.personality, null, 2);
    default:
      return "↳ Unknown symbolic intent.";
  }
}

function respond(input) {
  cli.innerHTML += `<div>> ${input}</div>`;
  const result = interpretCommand(input);
  result.split("\n").forEach(line => cli.innerHTML += `<div>${line}</div>`);
  cli.scrollTop = cli.scrollHeight;
}

inputLine.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const input = inputLine.value;
    respond(input);
    inputLine.value = "";
  }
});
