import { storage } from "firebase";
import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Avatar, Button, TextInput, Title } from "react-native-paper";
import { NavigationScreenProp } from "react-navigation";
import { UserContext } from "../authentication/userContext";
import ImagePicker from "../components/ImagePicker";
import { defaultProfilePhoto } from "../constants/photos";
import { Spacing } from "../styles/base";

interface ProfileScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

export default function ProfileScreen(props: ProfileScreenProps) {
  const [displayName, setDisplayname] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [areActionButtonsDisabled, setAreActionButtonDisabled] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      return;
    }

    setDisplayname(user.displayName);
  }, [user]);

  const updateUserProfile = useCallback(async () => {
    setAreActionButtonDisabled(true);
    if (imageUri) {
      const blob = await fetch(imageUri).then((response) => response.blob());

      const uploadTask = storage().ref().child(`profile${user.uid}`).put(blob);

      uploadTask.on(
        storage.TaskEvent.STATE_CHANGED,
        () => {},
        (err) => Alert.alert("Error", err.message),
        async () => {
          const photoURL = await uploadTask.snapshot.ref.getDownloadURL();
          await user.updateProfile({
            displayName,
            photoURL,
          });
          setUser(user);
          setAreActionButtonDisabled(false);
          props.navigation.navigate("Map");
        }
      );
    } else {
      await user.updateProfile({
        displayName,
      });
      setUser(user);
      setAreActionButtonDisabled(false);
      props.navigation.navigate("Map");
    }
  }, [imageUri, displayName]);

  const userProfileUri = imageUri || user.photoURL;

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Modificar Cuenta</Title>

      <Avatar.Image
        style={styles.profilePicture}
        size={150}
        source={
          userProfileUri
            ? {
                uri: userProfileUri,
              }
            : defaultProfilePhoto
        }
      />

      <ImagePicker setImageUri={setImageUri} />

      <TextInput
        label="Nombre"
        mode={"outlined"}
        style={styles.input}
        value={displayName}
        onChangeText={setDisplayname}
      />

      <Button disabled={areActionButtonsDisabled} mode="contained" style={styles.input} onPress={updateUserProfile}>
        Guardar Cambios
      </Button>

      <Button
        disabled={areActionButtonsDisabled}
        mode="text"
        style={styles.input}
        onPress={() => props.navigation.navigate("Map")}
      >
        Cancelar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: Spacing.xg,
  },
  title: {
    textAlign: "center",
  },
  profilePicture: {
    alignSelf: "center",
    margin: Spacing.md,
  },
  input: {
    marginVertical: Spacing.sm,
  },
});
