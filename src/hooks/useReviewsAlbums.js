import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const useReviews = () => {
  const { currentUser } = useAuth();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  // hämta alla album från DB som denna avändare äger!
  useEffect(() => {
    const unsub = db
      .collection("reviews")
      .where("owner", "==", currentUser.uid)
      .orderBy("title")
      .onSnapshot((snapshot) => {
        setLoading(true);
        const dbAlbums = [];
        snapshot.forEach((doc) => {
          dbAlbums.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setAlbums(dbAlbums);
        setLoading(false);
      });
    return unsub;
  }, [currentUser]);
  return { albums, loading };
};

export default useReviews;
