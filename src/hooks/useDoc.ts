import { DocumentData, DocumentReference, DocumentSnapshot, getDoc } from "firebase/firestore";
import Observable, { useObservable } from "../Observable";
import { useEffect } from "react";

interface ICache<DataType extends DocumentData = DocumentData> {
  data: DataType;
  updatedAt: number;
}

const documentDatas = new Map<string, Observable<ICache>>();

export const useDoc = <
  DataType extends DocumentData = DocumentData
>(ref: DocumentReference<DataType, DataType>): DataType | undefined => {
  if (!documentDatas.has(ref.path)) {
    documentDatas.set(ref.path, new Observable<ICache<DataType>>(undefined));
  }

  const state = documentDatas.get(ref.path) as Observable<ICache<DataType>>;
  
  const [cache, setCache] = useObservable(state);

  useEffect(() => {
    if (!cache || isOld(cache)) {
      getDoc(ref)
        .then(snapshot => setCache({
          data: snapshot.data(),
          updatedAt: Date.now(),
        }));
    }
  }, []);

  return cache?.data;
}

const isOld = (cache: ICache) => Date.now() - cache.updatedAt > 1000 * 60 * 5; // 5 minutes