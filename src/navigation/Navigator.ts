import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SignInScreen from "../screens/authentication/SignInScreen";
import SignUpScreen from "../screens/authentication/SignUpScreen";
import MapScreen from "../screens/MapScreen/MapScreen";

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen
  },
  { headerMode: "none" }
);

export const AppStack = createStackNavigator(
  {
    Map: MapScreen
  },
  { headerMode: "none" }
);

export const AuthNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack
    },
    {
      initialRouteName: "Auth"
    }
  )
);

export const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack
    },
    {
      initialRouteName: "App"
    }
  )
);
