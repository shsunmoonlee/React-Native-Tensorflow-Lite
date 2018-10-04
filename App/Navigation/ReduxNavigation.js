import React from 'react'
import { BackHandler, Platform } from 'react-native'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
 } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
import { NavigationActions } from "react-navigation";

// export const navigationMiddleware = createReactNavigationReduxMiddleware(
//   'root',
//   state => state.nav
// )

class ReduxNavigation extends React.Component {
  // componentDidMount () {
  //   if (Platform.OS === 'ios') return
  //   BackHandler.addEventListener('hardwareBackPress', () => {
  //     const { dispatch, nav } = this.props
  //     // change to whatever is your first screen, otherwise unpredictable results may occur
  //     if (nav.routes.length === 1 && (nav.routes[0].routeName === 'LaunchScreen')) {
  //       return false
  //     }
  //     // if (shouldCloseApp(nav)) return false
  //     dispatch({ type: 'Navigation/BACK' })
  //     return true
  //   })
  // }
  //
  // componentWillUnmount () {
  //   if (Platform.OS === 'ios') return
  //   BackHandler.removeEventListener('hardwareBackPress')
  // }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  };

  render () {
    const ReduxifiedNavigator = reduxifyNavigator(AppNavigation, "root");

        // return <AppNavigation navigation={{ dispatch: this.props.dispatch, state: this.props.nav, addListener: reduxifyNavigator('root') }} />
    // return <AppNavigation navigation={{ dispatch: this.props.dispatch, state: this.props.nav }} />
    // return <ReduxifiedNavigator navigation={{ dispatch: this.props.dispatch, state: this.props.nav, addListener: reduxifyNavigator(AppNavigation, 'root') }} />
    return <ReduxifiedNavigator />
  }
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
