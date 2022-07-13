import React, { FC, useEffect, useState } from "react";
import { useCallback } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Appbar, FAB } from "react-native-paper";
import { NavigationScreenProp } from "react-navigation";
import ActionBar from "../components/ActionBar";
import AddMarkerDialog from "../components/AddMarkerDialog";
import MarkerDetailDialog from "../components/MarkerDetailDialog";
import ProfileDetailDialog from "../components/ProfileDetailDialog";
import Markers, { colorMapper, Coordinates, GeoPoint, IMarker } from "../database/markers";

interface MapScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

export default function MapScreen({ navigation }: MapScreenProps) {
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [showAddMarkerDialog, setShowAddMarkerDialog] = useState(false);
  const [showMarkerDetail, setShowMarkerDetail] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<string>("");
  const [showProfileDetail, setShowProfileDetail] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    console.disableYellowBox = true;
    console.ignoredYellowBox = ["Setting timer"];
  }, []);

  useEffect(() => {
    async function fetchMarkers() {
      const snapshot = await Markers.getWithinRadius(
        20000,
        new GeoPoint(currentLocation.latitude, currentLocation.longitude)
      );
      setMarkers(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IMarker)).filter((marker) => !marker.attended)
      );
    }

    fetchMarkers();
  }, [currentLocation]);

  const getMapRegion = useCallback(
    () => ({
      ...currentLocation,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }),
    [currentLocation]
  );

  const onUserLocationChange = useCallback((event: any) => {
    event.persist();

    const { coordinate } = event.nativeEvent;
    setCurrentLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  }, []);

  const toggleAddMarker = useCallback(() => setShowAddMarkerDialog(!showAddMarkerDialog), [showAddMarkerDialog]);
  const toggleMarkerDetailDialog = useCallback(() => setShowMarkerDetail(!showMarkerDetail), [showMarkerDetail]);
  const toggleProfileDetail = useCallback(() => setShowProfileDetail(!showProfileDetail), [showProfileDetail]);

  return (
    <>
      <ActionBar>
        <Appbar.Action icon="account" onPress={toggleProfileDetail} />
      </ActionBar>

      <View style={styles.container}>
        <MapView
          showsUserLocation
          showsMyLocationButton
          loadingEnabled
          region={getMapRegion()}
          onUserLocationChange={onUserLocationChange}
          style={styles.mapStyle}
        >
          {markers.map((marker) => (
            <Marker
              pinColor={colorMapper(marker.necessity)}
              title={"Marcador"}
              key={marker.id}
              coordinate={marker.coordinates}
              onPress={() => {
                setSelectedMarker(marker.id);
                toggleMarkerDetailDialog();
              }}
            />
          ))}
        </MapView>

        <FAB style={styles.fab} icon="plus" onPress={toggleAddMarker} />

        {showProfileDetail && (
          <ProfileDetailDialog
            goToProfile={() => {
              navigation.navigate("Profile");
              toggleProfileDetail();
            }}
            toggleVisibility={toggleProfileDetail}
          />
        )}

        {showMarkerDetail && (
          <MarkerDetailDialog toggleVisibility={toggleMarkerDetailDialog} markerId={selectedMarker} />
        )}

        {showAddMarkerDialog && (
          <AddMarkerDialog currentLocation={currentLocation} toggleVisibility={toggleAddMarker} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
