from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

UPLOAD_FOLDER = os.getcwd()

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['video']
    original_filename = file.filename
    input_filepath = os.path.join(UPLOAD_FOLDER, original_filename)
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    file.save(input_filepath)

    # 假设 YOLOv5 输出到 runs/detect/exp 文件夹
    output_filepath = os.path.join(UPLOAD_FOLDER, original_filename)
    
    # 运行 Docker 处理视频
    subprocess.run([
        "docker", "run","--rm", "--ipc=host", "-v", f"{UPLOAD_FOLDER}:/usr/src/datasets", 
        "ultralytics/yolov5:latest", "/bin/bash", "-c", 
        f"python detect.py --weights yolov5s.pt --source /usr/src/datasets/{original_filename} --save-txt --save-conf --exist-ok && "
        f"cp runs/detect/exp/*.mp4 /usr/src/datasets"
    ], check=True)

    static_video_path = os.path.join(app.static_folder, original_filename)
    subprocess.run([
        "copy", output_filepath, static_video_path
    ], shell=True, check=True)


    converted_filename = f"converted_{original_filename}"
    converted_filepath = os.path.join(app.static_folder, converted_filename)
    ffmpeg_command = [
        "ffmpeg", "-y", "-i", static_video_path, "-c:v", "libx264", "-c:a", "aac", converted_filepath
    ]
    subprocess.run(ffmpeg_command, check=True)


    # 返回视频 URL
    video_url = request.host_url + 'static/' + f"converted_{original_filename}"
    print(video_url)
    return jsonify({"processed_video_url": video_url})


if __name__ == '__main__':
    app.run(debug=True, port=8080)