import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { Cache } from "./cache";

interface IUserData extends DocumentData {
  email: string;
  username: User["displayName"];
}

export const usersCache = new Cache<IUserData>();