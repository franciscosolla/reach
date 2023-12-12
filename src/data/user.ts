import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";

export interface IUser extends DocumentData {
  email: string;
  username: User["displayName"];
}