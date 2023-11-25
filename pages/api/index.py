from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import pytesseract
from pydub import AudioSegment
import speech_recognition as sr


app = Flask(__name__)
CORS(app)

@app.route("/api/textInput", methods=['POST'])
def return_text_input():
    user_input = request.args.get('value', default='default_value')
    response_message = "This is what you entered: " + user_input

    return jsonify({
        'message': response_message
    })

@app.route("/api/extractTextFromImage", methods=['POST'])
def extract_text_image():
    file = request.files['file']
    # Save the uploaded image temporarily
    image_path = 'temp_image.png'
    file.save(image_path)

    # Use Tesseract to extract text from the image
    extracted_text = pytesseract.image_to_string(Image.open(image_path))

    # Remove the temporary image file
    import os
    os.remove(image_path)

    return jsonify({
        'text': extracted_text.strip()
    })

@app.route("/api/extractTextFromAudio", methods=['POST'])
def extract_text_from_audio():
    audio_file = request.files['audio']
    # Save the uploaded audio temporarily
    audio_path = 'temp_audio.webm'
    audio_file.save(audio_path)

    # Convert the webm format to wav using pydub
    sound = AudioSegment.from_file(audio_path, format="webm")
    sound.export("temp_audio.wav", format="wav")

    # Use SpeechRecognition to transcribe the audio
    recognizer = sr.Recognizer()
    with sr.AudioFile("temp_audio.wav") as source:
        audio_data = recognizer.record(source)
        extracted_text = recognizer.recognize_google(audio_data, show_all=True)

        # Remove the temporary audio files
        import os
        os.remove(audio_path)
        os.remove("temp_audio.wav")

        return jsonify({
            'text': extracted_text['alternative'][0]['transcript']
        })

if __name__ == "__main__":
    app.run(debug=True, port=8080)
