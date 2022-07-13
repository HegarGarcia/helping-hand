import * as ExpoImagePicker from "expo-image-picker";
import { Dispatch, SetStateAction, useCallback } from "react";
import { Button } from "react-native-paper";

interface ImagePickerProps {
  setImageUri: Dispatch<SetStateAction<string>>;
}

export default function ImagePicker({ setImageUri }: ImagePickerProps) {
  const pickImage = useCallback(async () => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled === false) {
      setImageUri(result.uri);
    }
  }, [setImageUri]);

  return (
    <Button mode="outlined" onPress={pickImage}>
      Selecciona una foto
    </Button>
  );
}
