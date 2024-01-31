import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const StyledDiv = styled.div`
  color: red;
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
`;

const ButtonDiv = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VideoDiv = styled.div`
  height: 90%;
  width: 100%;
`;

export const AddVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [showVideoFile, setShowVideoFile] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setVideoFile(file);
    // 不需要在这里创建本地URL，因为我们将从后端获取URL
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      setUploadStatus("Uploading video...");
      const response = await axios.post(
        "http://localhost:8080/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadStatus("Upload completed.");

      // 使用从后端返回的URL更新视频源
      setShowVideoFile(response.data.processed_video_url);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("Upload failed.");
    }
  };

  return (
    <StyledDiv>
      <ButtonDiv>
        <input type="file" accept="video/*" onChange={handleFileSelect} />
        <button onClick={handleUpload}>Upload Video</button>
      </ButtonDiv>

      <VideoDiv>
        {uploadStatus && <p>{uploadStatus}</p>}
        {showVideoFile && (
          <video width="100%" height="100%" controls>
            <source src={showVideoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </VideoDiv>
    </StyledDiv>
  );
};