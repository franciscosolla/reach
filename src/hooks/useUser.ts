import { useEffect, useState } from "react";
import { IPost } from "../data/post";
import { DocumentReference, doc, getDocFromCache, getDocFromServer } from "firebase/firestore";
import { db } from "../firebase";
import { IUser } from "../data/user";

export const useUser = (uid?: string) => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    if (uid) {
      const userRef = doc(db, "users", uid) as DocumentReference<IUser>;
      getDocFromCache(userRef)
        .catch(() => {
          console.log("cache miss");
          return getDocFromServer(userRef)
        })
        .then(snapshot => snapshot.data())
        .then(setUser);
    }
  }, [uid]);

  return { user };
}