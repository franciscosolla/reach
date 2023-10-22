import { DocumentData } from "firebase/firestore";

export interface Post extends DocumentData {
  id: string;
  text: string;
}
