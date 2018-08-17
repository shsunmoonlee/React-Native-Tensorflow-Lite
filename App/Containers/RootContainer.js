import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import feathers from '../Components/feathers'
// Styles
import styles from './Styles/RootContainerStyles'
import UserActions from '../Redux/User'

class RootContainer extends Component {
  async componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    /**
     * feathers server connect
     */
    console.log("====FeathersClient is Connecting")
    feathers.io.on('connect', async () => {
      console.log("====FeathersClient is Connected")

      try {
        const response = await feathers.authenticate(undefined)
        console.log("=======first response", response)
        const response2 = await feathers.passport.verifyJWT(response.accessToken)
        console.log("=======second response", response2)

        try {
          const user = await feathers.service('users').get(payload.userId);
          console.log("=======user response", user)

          this.props.login({user, isAuthenticated: true})
          // this.user = user;
          // this.isAuthenticated = true;
          console.log("===received user information", user)
        } catch(e) {
          console.log("authentication failed", e)
        }
      } catch(e) {
        console.error('Authentication error', e);
      }

    });

    feathers.io.on('disconnect', () => {
      console.log('disconnected');
      this.isConnecting = true;
    });
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  login: (payload) => dispatch(UserActions.login(payload))
})

export default connect(null, mapDispatchToProps)(RootContainer)
