import { useState, useEffect } from "react";
import { db, storage } from "../firebase/index";
import { useAuth } from "../contexts/AuthContext";

const useUploadImage = (file, albumId) => {
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { currentUser } = useAuth();

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
    const fileRef = storage.ref(`images/${currentUser.uid}/${file.name}`);
    const uploadTask = fileRef.put(file);

    uploadTask.on("state_changed", (snap) => {
      setUploadProgress(
        Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      );
    });
    uploadTask
      .then(async (snapshot) => {
        const url = await snapshot.ref.getDownloadURL();
        // läggtill foto i db

        const image = {
          name: file.name,
          owner: currentUser.uid,
          path: snapshot.ref.fullPath,
          size: file.size,
          type: file.type,
          url,
        };

        if (albumId) {
          image.album = db.collection("albums").doc(albumId);
        }

        await db.collection("images").add(image);

        setIsSuccess(true);
        setUploadProgress(null);
        setUploadedImage(image);
        setIsSuccess(true);
      })
      .catch((error) => {
        console.error("If error:", error);
        setError({
          type: "warning",
          msg: `No upload! Big error (${error.code})`,
        });
      });
  }, [file, albumId, currentUser]);

  return { uploadProgress, uploadedImage, error, isSuccess };
};

export default useUploadImage;
