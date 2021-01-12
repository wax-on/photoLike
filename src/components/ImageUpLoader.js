import React, { useCallback, useState, useEffect } from "react";
import useUploadImage from "../hooks/useUploadImage";
import { useDropzone } from "react-dropzone";
import { ProgressBar } from "react-bootstrap";
import { Alert } from "react-bootstrap";

const ImageUpLoader = ({ albumId }) => {
  const [uploadFile, setUploadFile] = useState(null);
  const [message, setMessage] = useState(null);
  const { uploadProgress, error, isSuccess } = useUploadImage(
    uploadFile,
    albumId
  );

  useEffect(() => {
    if (error) {
      setMessage({
        error: true,
        text: error,
      });
    } else if (isSuccess) {
      setMessage({
        success: true,
        text: "Images successfully uploaded to your Photos folder",
      });

      setUploadFile(null);
    } else {
      setMessage(null);
    }
  }, [error, isSuccess]);

  const onFilesDropped = useCallback((acceptedFiles) => {
    if (acceptedFiles.lenght === 0) {
      return;
    }

    setUploadFile(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 0,
    accept: "image/gif, image/png, image/jpeg, image/jpg",
    onDrop: onFilesDropped,
  });

  return (
    <div
      {...getRootProps()}
      className={` bg-dark text-light text-center mt-3 px-4 py-3 ${
        isDragAccept ? `drag-accept` : ``
      } ${isDragReject ? `drag-reject` : ``}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        isDragAccept ? (
          <p>Drop your file here!</p>
        ) : (
          <p>Can't accept file format.</p>
        )
      ) : (
        <p>Upload your files here!</p>
      )}
      {acceptedFiles && (
        <div className="accepted-files">
          <ul className="list-unstyled">
            {acceptedFiles.map((file) => (
              <li key={file.name}>
                <small>
                  {file.name} ({Math.round(file.size / 1024)} kb)
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}

      {uploadProgress !== null && (
        <ProgressBar variant="danger" animated now={uploadProgress} />
      )}
      {message && (
        <Alert variant={message.error ? "warning" : "success"}>
          {message.text}
        </Alert>
      )}
    </div>
  );
};

export default ImageUpLoader;
