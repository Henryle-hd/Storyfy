from flask import Flask, jsonify,request
from flask_cors import CORS
from text_to_speech import save
from scriptwithai import create_script
import os
import re
from dotenv import load_dotenv

load_dotenv()
PORT=os.getenv("PORT")
OUTPUT_DIR = "../ui/public/audios"

os.makedirs(OUTPUT_DIR, exist_ok=True)

def sanitize_filename(filename):
    return re.sub(r'[\\/*?:"<>|]', "", filename)

app=Flask(__name__)
CORS(app)
@app.route('/api/test',methods=['GET','POST'])
def return_home():
    topic = request.json['topic']
    speed = request.json['speed']
    if topic == "":

        return jsonify({
            "script":'No topic provided',
        })
    else:
        print(topic)
        print(speed)
        script = create_script(topic)
        language = "en"
        sanitized_topic = sanitize_filename(topic.split(' ')[0])
        output_file = f"{sanitized_topic}.mp3"
        file_path = os.path.join(OUTPUT_DIR, output_file)
        if speed=="slower":
            save(script, language,slow=True, file=file_path)
        else:
            save(script, language, file=file_path)
        return jsonify({
            "path":f"/audios/{output_file}",
            "script":script,
        })

if __name__=="__main__":
    app.run(host='0.0.0.0',port=PORT,debug=False)