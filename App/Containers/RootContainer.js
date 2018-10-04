import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
// import ReduxNavigation from '../Navigation/ReduxNavigation'
import { createRootNavigator } from '../Navigation/AppNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import feathers from '../Components/feathers'
// Styles
import styles from './Styles/RootContainerStyles'
import UserActions from '../Redux/User'
import ChatActions from '../Redux/Chat'

class RootContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      isConnecting: false,
      user: null,
      messages: [],
      hasMoreMessages: false,
      skip: 0,
    }
    this._retrieveData()
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('feathers-jwt');
      this.props.login({jwt: value })
      console.log('=====asyncStorage feathers jwt', value)
      if (value !== null) {
        // We have data!!
        this.props.navigation.navigate(value ? 'SignedIn' : 'SignedOut');
        console.log(value);
      }
     } catch (error) {
       // Error retrieving data
     }
  }
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
      // this.isConnecting = false;

      // TODO implement reconnect login logic
      try {
        const response = await feathers.authenticate(undefined)
        console.log("=======reloggin in - first response", response)
        const response2 = await feathers.passport.verifyJWT(response.accessToken)
        console.log("=======reloggin in - second response", response2)

        try {
          const user = await feathers.service('users').get(response2.userId);
          console.log("=======reloggin in - user response", user)

          this.props.login({user, isAuthenticated: true})


          // this.user = user;
          // this.isAuthenticated = true;
        } catch(e) {
          console.log("authentication failed", e)
        }
      } catch(e) {
        console.error('Authentication error', e);
      }

    });



    if (feathers.get('accessToken')) {
      // TODO implement redux. user is authenticated
      // this.props.isAuthenticated = feathers.get('accessToken') !== null;
      console.log('===reloggin in getAccessToken', feathers.get('accessToken'));
    }

    feathers.io.on('disconnect', () => {
      console.log('====feathers disconnected');
      this.isConnecting = true;
    });
  }

  render () {
    const {isAuthenticated} = this.props;
    const Layout = createRootNavigator(isAuthenticated);


    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <Layout />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("===redux state tree", state)
  return {
    isAuthenticated: state.user.isAuthenticated,
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  login: (payload) => dispatch(UserActions.login(payload)),
  deleteMessage: (payload) => dispatch(ChatActions.deleteMessage(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
