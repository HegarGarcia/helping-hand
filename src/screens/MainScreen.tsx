import { AppLoading } from "expo";
import { apps, auth, initializeApp } from "firebase";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { UserContext } from "../authentication/userContext";
import firebaseConfig from "../config/firebase";
import { AppNavigator, AuthNavigator } from "../navigation/Navigator";
import { Theme } from "../styles/base";

export default function MainScreen() {
  const [isFirebaseLoaded, setIsFirebaseLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (apps.length <= 0) {
      initializeApp(firebaseConfig);
      setIsFirebaseLoaded(true);
    }
  }, []);

  useEffect(() => {
    auth().onAuthStateChanged((authData) => {
      setIsLoggedIn(!!authData);
      setUser(authData);
    });
  }, []);

  if (!isFirebaseLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <PaperProvider theme={Theme}>{isLoggedIn ? <AppNavigator /> : <AuthNavigator />}</PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
