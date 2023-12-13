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
}, Promise<string>>(async (request) => {
  logger.log("Creating post and action...");
  logger.log("data:", JSON.stringify(request.data, null, 4));


  if (!request.data.geohash || !request.data.text) {
    throw new HttpsError("invalid-argument", "Missing required fields");
  }

  const postRef = db.collection("posts").doc();

  try {
    const postWriteResult = await postRef.set({
      text: request.data.text,
      createdBy: request.auth?.uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    const pool = await sqlPool;

    const query = pool.table<IAction>("actions");
    await query.insert({
      geohash: request.data.geohash,
      target: postRef.path,
      created_at: postWriteResult.writeTime.toMillis(),
    });

    return postRef.path;
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
  const radiusInM = 15000; // 15km
  const bounds = geohashQueryBounds(center, radiusInM);

  try {
    const pool = await sqlPool;

    const query = pool.table<IAction>("actions");
    query.select("target");
    query.whereBetween("geohash", bounds[0]);

    for (let i = 1; i < bounds.length; i++) {
      query.orWhereBetween("geohash", bounds[i]);
    }

    query.orderBy("created_at", "desc");
    query.limit(50);

    const actions = await query;
    const posts = actions.map(({target}) => target);

    return posts;
  } catch (error) {
    logger.error("Error fetching posts:", error);
    throw new HttpsError("internal", "Failed to fetch posts");
  }
});
