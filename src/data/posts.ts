import { User } from "firebase/auth";
import { DocumentData, Timestamp } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app, auth } from "../firebase";
import { getCurrentCoordinates, getCurrentGeoHash } from "../location";
import { Cache } from "./cache";
import { postsCache } from "./post";
import { usersCache } from "./user";

interface IPost {
  username: string;
  text: string;
  createdAt: number;
}

const getPosts = httpsCallable<{ latitude: number, longitude: number }, string[]>(getFunctions(app), "getPosts");
const createPost = httpsCallable<{ text: string; geohash: string }, string>(getFunctions(app), "createPost");

const isOld = (updatedAt: number, elapsed: number) => Date.now() - updatedAt > elapsed;
const isOneDayOld = (updatedAt: number) => isOld(updatedAt, 1000 * 60 * 60 * 24); // 1 day
const isFiveMinutesOld = (updatedAt: number) => isOld(updatedAt, 1000 * 60 * 5); // 5 minutes

export class Posts {
  private static updatedAt: number;
  private static paths: string[] = [];
  
  private static cleanCache = () => {
    const userIds = new Set<string>();

    postsCache.forEach((cache, path) => {
      if (!Posts.paths.includes(path))  {
        postsCache.remove(path);
      } else {
        userIds.add(cache.data.createdBy);
      }
    });

    usersCache.forEach((_, id) => {
      if (!userIds.has(id)) {
        usersCache.remove(id);
      }
    });
  };

  static getPaths = async () => {
    if (Posts.updatedAt || isFiveMinutesOld(Posts.updatedAt)) {
      const [latitude, longitude] = await getCurrentCoordinates();
      const { data } = await getPosts({ latitude, longitude });
      Posts.paths = data;
      Posts.cleanCache();
    }

    return Posts.paths;
  };

  static create = async (text: string) => {
    const geohash = await getCurrentGeoHash();
    const { data: postPath } = await createPost({ text, geohash });
    
    postsCache.add(postPath, {
      createdBy: auth.currentUser.uid,
      createdAt: Timestamp.now(),
      text,
    });

    usersCache.add(auth.currentUser.uid, {
      email: auth.currentUser.email,
      username: auth.currentUser.displayName,
    });

    this.paths = [postPath, ...this.paths];
  };
}