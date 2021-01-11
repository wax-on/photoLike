import { useState, useEffect } from "react";
import { db, storage } from "../firebase/index";

const useUploadImage = (file) => {
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!file) {
      setUploadProgress(null);
      setUploadedImage(null);
      setError(null);
      setIsSuccess(false);

      return;
    }
    setError(null);
    setIsSuccess(false);
    const fileRef = storage.ref(`images/${file.name}`);
    const uploadTask = fileRef.put(file);

    uploadTask.on("state_changed", (snap) => {
      setUploadProgress(
        Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      );
    });
    uploadTask
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          // läggtill foto i db
          const image = {
            name: file.name,
            path: snapshot.ref.fullPath,
            size: file.size,
            type: file.type,
            url,
          };

          db.collection("images")
            .add(image)
            .then((doc) => {
              fileRef.updateMetadata({
                customMetadata: { firestoreId: doc.id },
              });
              setIsSuccess(true);
              setUploadProgress(null);
              setUploadedImage(image);
              setIsSuccess(true);
            });
        });
      })
      .catch((error) => {
        console.error("If error:", error);
        setError({
          type: "warning",
          msg: `No upload! Big error (${error.code})`,
        });
      });
  }, [file]);

  return { uploadProgress, uploadedImage, error, isSuccess };
};

export default useUploadImage;
