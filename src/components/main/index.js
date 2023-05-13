import React, { useRef, useState } from "react";
import { backgroundUpload, checkMark } from "../../assets/images/svgs";
import axios from "axios";
import BarLoader from "react-spinners/BarLoader";
import "./style.scss";

const MainView = (props) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleUploadClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hieund_cloudinary_preset");
    formData.append("folder", "image-uploader-master");
    setLoading(true);

    axios
      .post("https://api.cloudinary.com/v1_1/dna6tju5f/image/upload", formData)
      .then((response) => {
        setImage({ imageUrl: response.data.secure_url });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation(); //Chống lan truyền

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
      console.log("dragenter");
    } else if (e.type === "dragleave") {
      setDragActive(false);
      console.log("dragout");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="main-view">
      {image ? (
        <>
          <img src={checkMark} alt="check-mark-icon" />
          <h2>Uploaded Successfully!</h2>
        </>
      ) : (
        <>
          <h3>Upload your image</h3>
          <h4>File should be Jpeg, Png,...</h4>
        </>
      )}

      {image ? (
        <div className="main-view__uploaded">
          <img src={image?.imageUrl} alt="uploaded-img" />
        </div>
      ) : (
        <div
          className={`main-view__upload ${dragActive ? "--drag-active" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <img src={backgroundUpload} alt="backgroundUpload" />
          <span>Drag & Drop your image here</span>
        </div>
      )}

      {!image && <h4>Or</h4>}

      {!image ? (
        <>
          <button
            className="main-view__btn-choose-file"
            onClick={() => handleUploadClick()}
          >
            <span>Choose a file</span>
          </button>
          <input
            type="file"
            ref={inputFileRef}
            onChange={(e) => handleFileUpload(e.target.files[0])}
            style={{ display: "none" }}
          />
        </>
      ) : (
        <>
          <div className="main-view__image-link">
            <input type="text" value={image?.imageUrl} disabled />
            <button
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(image?.imageUrl);
              }}
              className="main-view__image-link__btn-copy-link"
            >
              Copy Link
            </button>
          </div>
          <div className="main-view__back">
            <span onClick={() => setImage(null)}>{"Back to previous"}</span>
          </div>
        </>
      )}

      {/* Bar progress */}
      {loading && (
        <div className="main-view__bar-loader">
          <BarLoader color="#2f80ed" width={"100%"} />
        </div>
      )}
    </div>
  );
};

export default MainView;
