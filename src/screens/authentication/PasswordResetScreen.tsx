import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { NavigationScreenProp } from "react-navigation";
import { forgotMyPassword } from "../../authentication/authenticateWithEmailAndPassword";
import styles from "./styles";

interface LoginScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

export default function PasswordResetScreen(props: LoginScreenProps) {
  const [email, setEmail] = useState("");

  const goToSignIn = () => props.navigation.navigate("SignIn");
  const sendResetPasswordEmail = () => {
    forgotMyPassword(email);
    goToSignIn();
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Iniciar con tu cuenta</Title>

      <TextInput
        autoCompleteType="email"
        mode="outlined"
        style={styles.textInput}
        onChangeText={setEmail}
        value={email}
        label="Correo electrónico"
      />

      <Button mode="contained" style={styles.actionButton} onPress={sendResetPasswordEmail}>
        Enviar correo de recuperación
      </Button>

      <Button mode="text" style={styles.actionButton} onPress={goToSignIn}>
        Iniciar sesión
      </Button>
    </View>
  );
}
