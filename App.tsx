import { UserProvider } from "./src/authentication/userContext";
import MainScreen from "./src/screens/MainScreen";

export default function App() {
  return (
    <UserProvider>
      <MainScreen />
    </UserProvider>
  );
}
