import React, { useContext, useState } from "react";
import { Picker, StyleSheet } from "react-native";
import { Button, Colors, Dialog, Paragraph, Portal, TextInput } from "react-native-paper";
import { UserContext } from "../authentication/userContext";
import Markers, { Coordinates, IMarker, transformCoordinateToGeoPoint } from "../database/markers";
import { FontSize, Spacing } from "../styles/base";

interface AddMarkerDialogProps {
  currentLocation: Coordinates;
  toggleVisibility: () => void;
}

export default function AddMarkerDialog({ toggleVisibility, currentLocation }: AddMarkerDialogProps) {
  const [needy, setNeedy] = useState("homeless");
  const [necessity, setNecessity] = useState("food");
  const [details, setDetails] = useState(null);
  const [references, setReferences] = useState(null);
  const { user } = useContext(UserContext);

  const addMarker = () => {
    if (!(needy && necessity)) {
      alert("Son requeridos quién y qué necesita");
      return;
    }

    const marker: IMarker = {
      attended: false,
      details,
      necessity,
      needy,
      references,
      userUid: user.uid,
      coordinates: transformCoordinateToGeoPoint(currentLocation),
    };

    Markers.add(marker);
    toggleVisibility();
  };

  return (
    <Portal>
      <Dialog visible onDismiss={toggleVisibility}>
        <Dialog.Title>¿A quien quieres ayudar?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>¿Quién lo necesita? (Requerido)</Paragraph>
          <Picker style={styles.picker} selectedValue={needy} onValueChange={setNeedy}>
            <Picker.Item label="Indigente" value="homeless" />
            <Picker.Item label="Niñ@" value="kid" />
            <Picker.Item label="Persona de la tercera edad" value="elder" />
          </Picker>

          <Paragraph>¿Qué se necesita? (Requerido)</Paragraph>
          <Picker style={styles.picker} selectedValue={necessity} onValueChange={setNecessity}>
            <Picker.Item label="Comida" value="food" />
            <Picker.Item label="Agua" value="water" />
            <Picker.Item label="Atencion Medica" value="medic_assistance" />
            <Picker.Item label="Ropa" value="clothes" />
            <Picker.Item label="Zapatos" value="shoes" />
            <Picker.Item label="Dinero" value="money" />
          </Picker>

          <TextInput
            mode="outlined"
            style={styles.textInput}
            label="Detalles"
            onChangeText={setDetails}
            value={details}
          />

          <TextInput
            mode="outlined"
            style={[styles.textInput, { marginBottom: 0 }]}
            label="Referencias"
            onChangeText={setReferences}
            value={references}
          />
        </Dialog.Content>

        <Dialog.Actions>
          <Button color={Colors.grey400} onPress={toggleVisibility}>
            Cancelar
          </Button>
          <Button onPress={addMarker}>Agregar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  picker: {
    textAlign: "center",
    padding: Spacing.sm,
    fontWeight: "500",
    fontSize: FontSize.md,
  },
  textInput: {
    marginVertical: Spacing.sm,
  },
});
