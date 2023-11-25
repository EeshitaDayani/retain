from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
    print(file)

    return jsonify({
        'text': 'Received image'
    })

if __name__ == "__main__":
    app.run(debug=True, port=8080)
