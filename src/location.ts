import * as Location from "expo-location";
import { geohashForLocation } from "geofire-common";

export const getCurrentCoordinates = (): Promise<[number, number]> =>
  Location.requestForegroundPermissionsAsync().then(({ status }) => {
    if (status === "granted") {
      return Location.getCurrentPositionAsync({}).then(({ coords }) => [
        coords.latitude,
        coords.longitude,
      ]);
    }
  });

export const getCurrentGeoHash = () =>
  getCurrentCoordinates().then(geohashForLocation);
