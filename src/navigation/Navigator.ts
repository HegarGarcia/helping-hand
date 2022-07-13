import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import PasswordResetScreen from "../screens/authentication/PasswordResetScreen";
import SignInScreen from "../screens/authentication/SignInScreen";
import SignUpScreen from "../screens/authentication/SignUpScreen";
import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    PasswordReset: PasswordResetScreen,
  },
  { headerMode: "none" }
);

export const AppStack = createStackNavigator(
  {
    Map: MapScreen,
    Profile: ProfileScreen,
  },
  { headerMode: "none" }
);

export const AuthNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
    },
    {
      initialRouteName: "Auth",
    }
  )
);

export const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
    },
    {
      initialRouteName: "App",
    }
  )
);
