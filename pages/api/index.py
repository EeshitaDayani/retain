from flask import Flask, request, jsonify
from flask_cors import CORS

# app instance
app = Flask(__name__)
CORS(app)

# /api/home
@app.route("/api/textInput", methods=['GET'])
def return_home():
    user_input = request.args.get('value', default='default_value')
    # print("LOGGING", user_input)

    # Create a response message
    response_message = "This is what you entered: " + user_input

    return jsonify({
        'message': response_message
    })


if __name__ == "__main__":
    app.run(debug=True, port=8080)