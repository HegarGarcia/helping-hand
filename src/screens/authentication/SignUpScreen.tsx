import { useCallback } from "react";
import { FC, useState } from "react";
import { Alert, View } from "react-native";
import { Avatar, Button, HelperText, TextInput, Title } from "react-native-paper";
import { NavigationScreenProp } from "react-navigation";
import Validator from "validator";
import { signUpWithEmailAndPassword } from "../../authentication/authenticateWithEmailAndPassword";
import { Spacing } from "../../styles/base";
import styles from "./styles";

interface SignUpScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

export default function SignUpScreen(props: SignUpScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [username, setUsername] = useState("");

  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [doPasswordMatch, setDoPasswordMatch] = useState(true);

  const signUp = useCallback(() => {
    const doesPasswordsMatch = password === passwordConfirmation;

    if (isValidEmail && doesPasswordsMatch) {
      signUpWithEmailAndPassword({ email, password, username });
    } else {
      setPasswordConfirmation("");
      setIsValidPassword(true);
      Alert.alert("Error", "Las contraseñas no coinciden");
    }
  }, [password, passwordConfirmation, isValidEmail, doPasswordMatch]);

  const validateUsername = useCallback(() => setIsValidUsername(username.length > 0), [username]);
  const valdateEmail = useCallback(() => setIsValidEmail(Validator.isEmail(email)), [email]);
  const validatePasswordMatch = useCallback(
    () => setDoPasswordMatch(password === passwordConfirmation),
    [password, passwordConfirmation]
  );
  const validatePassword = useCallback(() => setIsValidPassword(password.length >= 8), [password]);

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={200}
        style={{ alignSelf: "center", marginBottom: Spacing.md }}
        source={require("../../../assets/icon.png")}
      />

      <Title style={styles.title}>Crea tu cuenta</Title>
      <TextInput
        autoCompleteType="name"
        mode="outlined"
        style={styles.textInput}
        value={username}
        onChangeText={setUsername}
        onEndEditing={validateUsername}
        label="Nombre de Usuario"
      />

      <HelperText type="error" visible={!isValidUsername}>
        El nombre de usuario es obligatorio
      </HelperText>

      <TextInput
        autoCompleteType="email"
        mode="outlined"
        style={styles.textInput}
        value={email}
        onChangeText={setEmail}
        onEndEditing={valdateEmail}
        label="Email"
      />

      <HelperText type="error" visible={!isValidEmail}>
        ¡El email no es válido!
      </HelperText>

      <TextInput
        autoCompleteType="off"
        mode="outlined"
        secureTextEntry={true}
        style={styles.textInput}
        value={password}
        onChangeText={setPassword}
        onEndEditing={validatePassword}
        label="Contraseña"
      />

      <HelperText type="error" visible={!isValidPassword}>
        La contraseña debe tener mínimo 8 caracteres
      </HelperText>

      <TextInput
        autoCompleteType="off"
        mode="outlined"
        secureTextEntry={true}
        style={styles.textInput}
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        onEndEditing={validatePasswordMatch}
        label="Confirma tu contraseña"
      />
      <HelperText type="error" visible={!doPasswordMatch}>
        ¡La contraseña no coincide!
      </HelperText>

      <Button mode="contained" style={styles.textInput} onPress={signUp}>
        Registrarme
      </Button>

      <Button mode="text" style={styles.textInput} onPress={() => props.navigation.navigate("SignIn")}>
        Iniciar sesión
      </Button>
    </View>
  );
}
