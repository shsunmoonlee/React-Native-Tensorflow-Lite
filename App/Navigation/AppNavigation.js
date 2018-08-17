import { StackNavigator } from 'react-navigation'
import ObjectDetectScreen from '../Containers/ObjectDetectScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import Login from '../Containers/Login'
import Signup from '../Containers/Signup'

import styles from './Styles/NavigationStyles'

// export const UnauthenticatedNavigator = StackNavigator({
//   LaunchScreen: { screen: LaunchScreen },
//   Login: {screen: Login},
//   Signup: {screen: Signup}
// }, {mode: 'modal', headerMode: 'none'});

// Manifest of possible screens
const PrimaryNav = StackNavigator({
    Login: { screen: Login },
    Signup: { screen: Signup },
    LaunchScreen: { screen: LaunchScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
