from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import pytesseract

app = Flask(__name__)
CORS(app)

# TODO: FOR SHRIYA: Go into the API folder -> brew install pytessaract -> pip install tessaract

@app.route("/api/textInput", methods=['GET'])
def return_text_input():
    user_input = request.args.get('value', default='default_value')
    response_message = "This is what you entered: " + user_input

    return jsonify({
        'message': response_message
    })

@app.route("/api/extractText", methods=['POST'])
def extract_text():
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

if __name__ == "__main__":
    app.run(debug=True, port=8080)
