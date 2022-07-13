import { GeoPoint as IGeoPoint } from "@firebase/firestore-types";
import { firestore } from "firebase/app";
import "firebase/firestore";
import { GeoFirestore } from "geofirestore";
import { Colors } from "react-native-paper";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface IMarker {
  id?: string;
  needy: string;
  necessity: string;
  details: string;
  references: string;
  attended: boolean;
  userUid: string;
  coordinates: IGeoPoint;
}

export const GeoPoint = firestore.GeoPoint;

export const transformCoordinateToGeoPoint = ({ latitude, longitude }: Coordinates) =>
  new firestore.GeoPoint(latitude, longitude);

export const colorMapper = (necessityType: string): string => {
  let color: string;

  switch (necessityType) {
    case "food":
      color = Colors.green500;
      break;
    case "water":
      color = Colors.blue400;
      break;
    case "medic_assistance":
      color = Colors.red400;
      break;
    case "clothes":
      color = Colors.purple300;
      break;
    case "shoes":
      color = Colors.brown500;
      break;
    case "money":
      color = Colors.yellow300;
      break;
    default:
      color = "";
      break;
  }

  return color;
};

export default class Markers {
  private static getGeofireMarkersReference() {
    const geoRef = new GeoFirestore(firestore());
    return geoRef.collection("markers");
  }

  static async add(marker: IMarker) {
    await Markers.getGeofireMarkersReference().add(marker);
  }

  static async get(id: string) {
    return await Markers.getGeofireMarkersReference().doc(id).get();
  }

  static getWithinRadius(radius: number, center: Coordinates) {
    return Markers.getGeofireMarkersReference()
      .near({
        center: transformCoordinateToGeoPoint(center),
        radius,
      })
      .get();
  }

  static delete(id: string) {
    Markers.getGeofireMarkersReference().doc(id).delete();
  }

  static async markAsAttended(id: string) {
    const markerReference = Markers.getGeofireMarkersReference().doc(id);
    const marker = (await markerReference.get()).data();
    markerReference.update({ ...marker, attended: true });
  }
}
