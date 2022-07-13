import { useCallback, useState } from "react";
import { View } from "react-native";
import { Avatar, Button, HelperText, TextInput } from "react-native-paper";
import { NavigationScreenProp } from "react-navigation";
import Validator from "validator";
import { signInWithEmailAndPassword } from "../../authentication/authenticateWithEmailAndPassword";
import { Spacing } from "../../styles/base";
import styles from "./styles";

interface SignInScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

export default function SignInScreen(props: SignInScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const valdateEmail = useCallback(() => setIsValidEmail(Validator.isEmail(email)), []);
  const validatePassword = useCallback(() => setIsValidPassword(password.length >= 8), []);

  const goToSignUp = useCallback(() => props.navigation.navigate("SignUp"), [props.navigation.navigate]);
  const goToPasswordReset = useCallback(() => props.navigation.navigate("PasswordReset"), [props.navigation.navigate]);

  const signIn = useCallback(() => {
    if (isValidEmail && isValidPassword) {
      signInWithEmailAndPassword({ email, password });
    }
  }, [isValidEmail, isValidPassword]);

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={200}
        style={{ alignSelf: "center", marginBottom: Spacing.md }}
        source={require("../../../assets/icon.png")}
      />

      <TextInput
        autoCompleteType="email"
        mode="outlined"
        style={styles.textInput}
        onChangeText={setEmail}
        onEndEditing={valdateEmail}
        value={email}
        label="Email"
      />

      <HelperText type="error" visible={!isValidEmail}>
        ¡El email no es válido!
      </HelperText>

      <TextInput
        autoCompleteType="off"
        mode="outlined"
        style={styles.textInput}
        secureTextEntry={true}
        onChangeText={setPassword}
        onEndEditing={validatePassword}
        value={password}
        label="Contraseña"
      />

      <HelperText type="error" visible={!isValidPassword}>
        La contraseña invalida
      </HelperText>

      <Button mode="contained" style={styles.actionButton} onPress={signIn}>
        Iniciar Sesión
      </Button>

      <Button mode="text" style={styles.actionButton} onPress={goToSignUp}>
        Registrate
      </Button>

      <Button mode="text" style={styles.actionButton} onPress={goToPasswordReset}>
        ¿Olvidaste tu contraseña?
      </Button>
    </View>
  );
}
