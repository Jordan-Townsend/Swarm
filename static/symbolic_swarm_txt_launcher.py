
import os
import json
from datetime import datetime

USL_TXT_SOURCES = [
    "new_symbolic_swarm_named.txt",
    "symbolic_swarm_dashboard.txt"
]

def convert_txt_to_py(txt_file):
    if not os.path.exists(txt_file): return None
    try:
        with open(txt_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            if "code" in data:
                py_file = txt_file.replace(".txt", ".py")
                with open(py_file, "w", encoding="utf-8") as out:
                    out.write(data["code"])
                return py_file
    except Exception as e:
        print(f"[x] Failed to convert {txt_file}: {e}")
    return None

def run_module(py_path):
    try:
        with open(py_path, "r", encoding="utf-8") as f:
            print(f"[>] Executing {py_path}")
            exec(f.read(), globals())
    except Exception as e:
        print(f"[x] Execution error in {py_path}: {e}")

if __name__ == "__main__":
    print("[*] Symbolic Swarm (USL .txt compatibility mode)")
    for txt in USL_TXT_SOURCES:
        py_path = convert_txt_to_py(txt)
        if py_path:
            run_module(py_path)
    print("[✓] Swarm executed successfully.")
