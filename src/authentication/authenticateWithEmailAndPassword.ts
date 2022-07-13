import { auth } from "firebase";
import { Alert } from "react-native";

interface SignUpWithEmailAndPasswordParams {
  email: string;
  password: string;
  username: string;
}

export async function signUpWithEmailAndPassword({
  email,
  password,
  username,
}: SignUpWithEmailAndPasswordParams): Promise<void> {
  let errorMessage: string;

  try {
    const { user } = await auth().createUserWithEmailAndPassword(email, password);
    await user.sendEmailVerification();

    if (user) {
      await user.updateProfile({ displayName: username });
    }
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "Ya hay una cuenta registrada con su email";
        break;
      case "auth/invalid-email":
        errorMessage = "Email inválido";
        break;
      case "auth/weak-password":
        errorMessage = "Su password es débil";
        break;
    }
  }

  if (errorMessage) {
    Alert.alert("Error en creación de cuenta", errorMessage);
  }
}

interface SignInWithEmailAndPasswordParams {
  email: string;
  password: string;
}

export async function signInWithEmailAndPassword({ email, password }: SignInWithEmailAndPasswordParams): Promise<void> {
  let errorMessage: string;

  try {
    const { user } = await auth().signInWithEmailAndPassword(email, password);

    if (!user.emailVerified) {
      await auth().signOut();
      Alert.alert("Cuenta no verificada", "Revisa tu correo");
      return;
    }

    return;
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "Ya hay una cuenta create con tu email";
        break;
      case "auth/user-not-found":
        errorMessage = "Usuario no registrado";
        break;
      case "auth/wrong-password":
        errorMessage = "Contraseña inválida";
        break;
      default:
        errorMessage = "Credenciales inválidas";
        break;
    }
  }

  if (errorMessage) {
    Alert.alert("Error en inicio de sesión", errorMessage);
  }
}

export async function forgotMyPassword(email: string): Promise<void> {
  try {
    await auth().sendPasswordResetEmail(email);
  } catch (error) {
    let errorMessage: string;

    switch (error.code) {
      case "auth/user-not-found": {
        errorMessage = "Email no reigstrado";
        break;
      }
    }

    if (errorMessage) {
      Alert.alert("Error en recuperación de contraseña", errorMessage);
    }
  }
}
