from flask import Flask, render_template, request, jsonify, send_from_directory, redirect
import os
import json
from voice_input import listen_and_define
from voice_output import speak
from symbolic_logger import append_to_log

app = Flask(__name__, template_folder="templates", static_folder="static")
LOG_PATH = "swarms/symbolic_log.json"

@app.route("/")
def consent():
    return send_from_directory(".", "index_consent.html")

@app.route("/interface")
def interface():
    return render_template("index.html")

@app.route("/listen")
def listen_route():
    response = listen_and_define()
    append_to_log(response)
    return response

@app.route("/speak", methods=["POST"])
def speak_route():
    text = request.json.get("text", "")
    speak(text)
    append_to_log(f"Spoken: {text}")
    return "", 204

@app.route("/log")
def log_route():
    if os.path.exists(LOG_PATH):
        with open(LOG_PATH, "r", encoding="utf-8") as f:
            try:
                return jsonify(json.load(f))
            except:
                return jsonify([])
    return jsonify([])

@app.route("/video_feed")
def video_feed():
    from webcam_emotion_logic import generate_frames
    from flask import Response
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
