import { User } from "firebase/auth";
import { DocumentData, Timestamp } from "firebase/firestore";

export interface IPost extends DocumentData {
  createdAt: Timestamp;
  createdBy: User["uid"];
  text: string;
}