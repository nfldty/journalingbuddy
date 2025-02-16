from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os
import json

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/save_json', methods=['POST'])
def save_json():
    try:
        json_data = request.get_json()
        if not json_data or 'timestamp' not in json_data[0]:
            return jsonify({"error": "Invalid data format"}), 400

        save_dir = 'chat_history'
        if not os.path.exists(save_dir):
            os.makedirs(save_dir)

        filename = os.path.join(save_dir, 'past_content.json')

        with open(filename, 'w') as json_file:
            json.dump(json_data, json_file, indent=4)

        return jsonify({"message": "File saved successfully!"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
