import { User } from "firebase/auth";
import { DocumentData, Timestamp } from "firebase/firestore";
import { Cache } from "./cache";

interface IPostData extends DocumentData {
  createdAt: Timestamp;
  createdBy: User["uid"];
  text: string;
}

export const postsCache = new Cache<IPostData>();