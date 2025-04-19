
import speech_recognition as sr

def listen_and_define():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Swarm is listening...")
        audio = recognizer.listen(source)
        try:
            text = recognizer.recognize_google(audio)
            print(f"Recognized: {text}")
            return f"USL[Define]: {text}"
        except sr.UnknownValueError:
            return "USL[Reflect]: Unintelligible utterance"
        except sr.RequestError:
            return "USL[Reflect]: Microphone input failure"
