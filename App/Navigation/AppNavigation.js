import { StackNavigator } from 'react-navigation'
import ObjectDetectScreen from '../Containers/ObjectDetectScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ObjectDetectScreen: { screen: ObjectDetectScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'ObjectDetectScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
