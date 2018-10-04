import React from 'react'
import { TabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation'
import { FontAwesome } from "react-native-vector-icons";

import ObjectDetectScreen from '../Containers/ObjectDetectScreen'
import Chat from '../Containers/Chat'
import LaunchScreen from '../Containers/LaunchScreen'
import Login from '../Containers/Login'
import Signup from '../Containers/Signup'
import ObjectDetectionView from '../Containers/ObjectDetectionView'
import styles from './Styles/NavigationStyles'
const headerStyle = styles.header
export const SignedOut = createStackNavigator({
  LaunchScreen: {
    screen: LaunchScreen,
   },
  Login: {screen: Login},
  Signup: {screen: Signup},
  ObjectDetectionView: {screen: ObjectDetectionView}
}, {
  headerMode: 'none',
  initialRouteName: 'ObjectDetectionView',
  navigationOptions: {
    headerStyle: styles.header
  }
});

// Manifest of possible screens
export const SignedIn = TabNavigator({
    // ObjectDetectScreen: { screen: ObjectDetectScreen },
    Chat: {
      screen: Chat,
      navigationOptions: {
        tabBarLabel: "Chat",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={30} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: Chat,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user" size={30} color={tintColor} />
        )
      }
    },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Chat',
  navigationOptions: {
    headerStyle: styles.header
  }
})

// const MainNavigator = createcreateSwitchNavigator(
//     {
//       SignedIn: { screen: SignedIn },
//       SignedOut: { screen: SignedOut },
//     },
//     {
//       initialRouteName: "SignedOut"
//     }
//   );


export const createRootNavigator = (signedIn = false) => {
  console.log("====signedIN createRootNavigator", signedIn)
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      headerMode: 'none',
      navigationOptions: {
        headerStyle: styles.header
      },
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
// export default MainNavigator
