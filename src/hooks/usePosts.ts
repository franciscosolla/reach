import { useCallback, useEffect, useMemo, useState } from "react";
import Observable, { useObservable } from "../Observable";
import { getCurrentCoordinates, getCurrentGeoHash } from "../location";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app, auth, db } from "../firebase";
import { DocumentData, DocumentReference, Timestamp, doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const pathsState = new Observable<string[]>([]);
let updatedAt: number | null = null; 

const getPosts = httpsCallable<{ latitude: number, longitude: number }, string[]>(getFunctions(app), "getPosts");

export const usePostPaths = () => {
  const [paths, setPaths] = useObservable(pathsState);
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);

    try {
      const [latitude, longitude] = await getCurrentCoordinates();
      const { data } = await getPosts({ latitude, longitude });
      setPaths(data);
    } catch (error) {
      console.error(error);
    }

    updatedAt = Date.now();
    setIsLoading(false);
  }, []);

  return { paths, load, isLoading, updatedAt };
}

interface ICache<DataType extends DocumentData = DocumentData> {
  data: DataType;
  updatedAt: number;
}

const documentDataCache = new Map<string, ICache>();

interface IUserData extends DocumentData {
  email: string;
  username: User["displayName"];
}

interface IPostData extends DocumentData {
  createdAt: Timestamp;
  createdBy: User["uid"];
  text: string;
}

interface IPost {
  username: string;
  text: string;
  createdAt: number;
}

export const usePost = (postPath: string) => {
  const postCache = documentDataCache.get(postPath) as ICache<IPostData>;
  const userCache = documentDataCache.get(postCache?.data.createdBy) as ICache<IUserData>;

  const [post, setPost] = useState<IPost>(() => {
    if (!postCache || !userCache) {
      return undefined;
    }

    return {
      username: userCache.data.username,
      text: postCache.data.text,
      createdAt: postCache.data.createdAt.toMillis(),
    };
  });

  useEffect(() => {
    if (!postCache && postPath) {
      const getPostData = async () => {
        const postRef = doc(db, postPath) as DocumentReference<IPostData>;
        const postSnapshot = await getDoc(postRef);
        const postData = postSnapshot.data();

        documentDataCache.set(postPath, {
          data: postData,
          updatedAt: Date.now(),
        });

        if (!userCache || isOld(userCache)) {
          const userRef = doc(db, "users", postData.createdBy) as DocumentReference<IUserData>;
          const userSnapshot = await getDoc(userRef);
          const userData = userSnapshot.data();

          documentDataCache.set(postData.createdBy, {
            data: userData,
            updatedAt: Date.now(),
          });

          setPost({
            username: userData.username,
            text: postData.text,
            createdAt: postData.createdAt.toMillis(),
          });
        } else {
          setPost({
            username: userCache.data.username,
            text: postData.text,
            createdAt: postData.createdAt.toMillis(),
          });
        }
      }

      getPostData();
    }
  }, [postCache, postPath, userCache]);

  return post;
}

const isOld = (cache: ICache) => Date.now() - cache.updatedAt > 1000 * 60 * 60 * 24; // 1 day

const createPost = httpsCallable<{ text: string; geohash: string }, string>(getFunctions(app), "createPost");

export const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useAuthState(auth);

  const submitPost = useCallback(async (text: string) => {
    setIsLoading(true);
    
    try {
      const geohash = await getCurrentGeoHash();
      const { data: postPath } = await createPost({ text, geohash });
      documentDataCache.set(postPath, {
        data: {
          createdBy: user.uid,
          createdAt: Timestamp.now(),
          text,
        },
        updatedAt: Date.now(),
      });
      documentDataCache.set(user.uid, {
        data: {
          email: user.email,
          username: user.displayName,
        },
        updatedAt: Date.now(),
      });
      pathsState.setValue([postPath, ...pathsState.value]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  return [submitPost, isLoading] as const;
}