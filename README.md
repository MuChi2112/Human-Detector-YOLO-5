# Human Detector YOLOv5 Application
![img](https://github.com/MuChi2112/Human-Detector-YOLO-5/blob/main/readme_pic.png?raw=true)

## Introduction
The Human Detector YOLOv5 is a sophisticated application designed for detecting human figures in videos. It leverages the powerful YOLOv5 model for high-accuracy detection and is built using a Flask backend and a frontend interface that could be developed with technologies like React or Vue.js. The application encapsulates the model within a Docker container, ensuring a seamless and consistent environment for YOLOv5 execution.

## Key Features
- **Web-Based Interface**: Provides an intuitive web interface for easy video uploads and processing.
- **Advanced Human Detection**: Utilizes the state-of-the-art YOLOv5 model for efficient and precise human detection in video streams.
- **Dockerized Model Deployment**: The YOLOv5 model runs inside a Docker container, facilitating easy deployment and scalability.
- **Real-Time Processing Feedback**: The application provides a URL to the processed video, highlighting detected humans, after processing is complete.

## Requirements
To run the Human Detector YOLOv5 application, you will need:
- Docker
- Python 3.x
- Flask and Flask-CORS for the backend
- Node.js and a package manager (npm or yarn) for running the frontend
- ffmpeg for video processing

## Installation
Before running the application, ensure that Docker is installed and the Docker daemon is running. Then, follow these steps to set up the application:

1. **Frontend Setup**: Navigate to the frontend directory and install the necessary dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. **Backend Setup**: Install the required Python libraries for the Flask backend:
   ```bash
   pip install flask flask-cors
   ```

## Running the Application
Follow these steps to run the Human Detector YOLOv5 application:

1. **Start Docker**: Ensure the Docker daemon is running on your system.

2. **Start the Frontend**:
   - Open a terminal and navigate to the frontend directory.
   - Run the development server using npm:
     ```bash
     npm run dev
     ```

3. **Start the Backend**:
   - Open a new terminal window or tab.
   - Navigate to the backend directory where `main.py` is located.
   - Run the Flask application:
     ```bash
     python main.py
     ```

4. **Access the Application**:
   - Open a web browser and go to the URL provided by the backend `main.py` script. This will typically be something like `http://localhost:5000` or a similar local address.

5. **Upload and Process Videos**:
   - Use the web interface to upload a video file.
   - The application will process the video and return a link to the processed video with human detections highlighted.

## Note
- The backend's `main.py` script handles video processing and interacts with the YOLOv5 model inside the Docker container. Ensure that the Docker container with the YOLOv5 model is correctly set up and accessible by the Flask application.
- The frontend should be configured to communicate with the backend API for uploading videos and retrieving processed results. Ensure that CORS settings are correctly configured to allow requests between the frontend and backend services.
