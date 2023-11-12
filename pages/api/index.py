from flask import Flask, request, jsonify
from flask_cors import CORS

# app instance
app = Flask(__name__)
CORS(app)

# /api/home
@app.route("/api/textInput", methods=['GET'])
def return_home():
    input_text = request.args.get('value', default='default_value')

    return jsonify({
        'message': 'Success'
    })


if __name__ == "__main__":
    app.run(debug=True, port=8080)