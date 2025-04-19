
import json
from datetime import datetime
import os

LOG_PATH = "swarms/symbolic_log.json"

def append_to_log(entry):
    log = []
    if os.path.exists(LOG_PATH):
        with open(LOG_PATH, "r", encoding="utf-8") as f:
            try:
                log = json.load(f)
            except json.JSONDecodeError:
                pass
    log.append({
        "timestamp": datetime.now().isoformat(),
        "event": entry
    })
    with open(LOG_PATH, "w", encoding="utf-8") as f:
        json.dump(log, f, indent=2)
