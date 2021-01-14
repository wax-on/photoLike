import { useEffect, useState } from "react";
import { db } from "../firebase";

const useImages = (albumId) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("images")
      .where("album", "array-contains", db.collection("albums").doc(albumId))
      .orderBy("name")
      .onSnapshot((snap) => {
        const imgs = [];

        snap.forEach((doc) => {
          imgs.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setImages(imgs);
      });

    return unsubscribe;
  }, [albumId]);

  return { images };
};

export default useImages;
