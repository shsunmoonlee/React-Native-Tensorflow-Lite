import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  // container: {
  //   paddingBottom: Metrics.baseMargin
  // },
  // logo: {
  //   marginTop: Metrics.doubleSection,
  //   height: Metrics.images.logo,
  //   width: Metrics.images.logo,
  //   resizeMode: 'contain'
  // },
  // centered: {
  //   alignItems: 'center'
  // }
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  logo: {
    resizeMode: 'contain',
    width: 280,
    height: 80
  },
  tagline: {
    marginTop: 5,
    fontSize: 28,
    fontWeight: '200',
    color: '#999'
  },
  bottomSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 0,
    paddingBottom: 15
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 140
  },
})
