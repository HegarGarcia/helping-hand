import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SignInScreen from "../screens/authentication/SignInScreen";
import SignUpScreen from "../screens/authentication/SignUpScreen";

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen
  },
  { headerMode: "none" }
);

const AppStack = createStackNavigator({}, { headerMode: "none" });

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
