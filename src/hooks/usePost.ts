import { useEffect, useState } from "react";
import { IPost } from "../data/post";
import { DocumentReference, doc, getDocFromCache, getDocFromServer } from "firebase/firestore";
import { db } from "../firebase";

export const usePost = (path: string) => {
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    const postRef = doc(db, path) as DocumentReference<IPost>;
    getDocFromCache(postRef)
      .catch(() => getDocFromServer(postRef))
      .then(snapshot => snapshot.data())
      .then(setPost);
  }, []);

  return { post };
}