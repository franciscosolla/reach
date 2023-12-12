import {logger} from "firebase-functions";
import {firestore} from "firebase-admin";
import {initializeApp} from "firebase-admin/app";
import {onCall, HttpsError} from "firebase-functions/v2/https";
import knex from "knex";
import {geohashQueryBounds, Geopoint} from "geofire-common";

initializeApp();
const db = firestore();

const createUnixSocketPool = async () => {
  return knex({
    client: "pg",
    connection: {
      user: "postgres",
      password: "71625340",
      database: "postgres",
      host: "/cloudsql/reach-host:us-central1:reach-db",
    },
  });
};

const sqlPool = createUnixSocketPool();

interface IAction {
  id: number;
  geohash: string;
  target: string;
  created_at: number;
}

export const createPost = onCall<{
  text: string;
  geohash: string;
}, Promise<void>>(async (request) => {
  logger.log("Creating post and action...");
  logger.log("data:", JSON.stringify(request.data, null, 4));


  if (!request.data.geohash || !request.data.text) {
    throw new HttpsError("invalid-argument", "Missing required fields");
  }

  const postRef = db.collection("posts").doc();

  try {
    await postRef.set({
      text: request.data.text,
      createdBy: request.auth?.uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
    }).then((result) => sqlPool
      .then((pool) => pool.table<IAction>("actions")
        .insert({
          geohash: request.data.geohash,
          target: postRef.path,
          created_at: result.writeTime.toMillis(),
        })));
  } catch (error) {
    console.error("Error:", error);
    throw new HttpsError("internal", "Failed to create action entry");
  }
});

export const getPosts = onCall<{
  latitude: number;
  longitude: number;
}, Promise<string[]>>(async (request) => {
  logger.log("Getting posts...");
  logger.log("data:", JSON.stringify(request.data, null, 4));

  if (!request.data.latitude || !request.data.longitude) {
    throw new HttpsError("invalid-argument", "Missing required fields");
  }

  const center: Geopoint = [request.data.latitude, request.data.longitude];
  const radiusInM = 1000; // 1km

  const bounds = geohashQueryBounds(center, radiusInM);

  try {
    const posts: string[] = await sqlPool.then(
      (pool) => pool.table<IAction>("actions")
        .select("target")
        .whereBetween("geohash", bounds[0])
        .orderBy("created_at", "desc")
        .limit(10)
    ).then((actions) => actions.map((action) => action.target));

    return posts;
  } catch (error) {
    logger.error("Error fetching posts:", error);
    throw new HttpsError("internal", "Failed to fetch posts");
  }
});
