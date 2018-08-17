'use strict';

import React, {Component} from 'react';
import {
  Alert,
  Keyboard,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import feathers from '../Components/feathers'
import { connect } from 'react-redux'

import {Button} from 'react-native-elements';
// import NavIcons from '../components/NavIcons';
// import Utils from '../Utils';

import baseStyles from './Styles/baseStyles';
import UserActions from '../Redux/User'

class Login extends Component {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loading: false,
    }
    // this.store = this.props.screenProps.store;
  }
  onChangeEmail(text) {
    this.setState({email: text})
  }

  onChangePassword(text) {
    this.setState({password: text})
  }

  async login() {
    const {email, password} = this.state
    // if (!Utils.validateEmail(this.email) || !Utils.validatePassword(this.password)) {
    //   Alert.alert('Error', 'Please enter a valid email or password.');
    //   return;
    // }
    console.log("====inside login", email, password)
    this.setState({loading: true})
    try {
      const response = await feathers.authenticate({
        strategy: 'local',
        email, password
      })
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

    // .then((response) => {
    //   return feathers.passport.verifyJWT(response.accessToken);
    // }).then(payload => {
    //   return feathers.service('users').get(payload.userId);
    // }).catch(e => {
    //   // Show login page (potentially with `e.message`)
    //   console.error('Authentication error', e);
    // });
    // this.store.login(this.email, this.password).catch(error => {
    //   loading = false;
    //   console.log('LOGIN', 'ERROR', JSON.stringify(error), error.message);
    //   Alert.alert('Error', 'Login failed, please check your login/password.');
    // });
  }

  render() {
    const {loading} = this.state
    console.log("===inside login render")
    if (loading) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
          <Text style={{fontSize: 16}}>Signing in...</Text>
        </View>
      );
    }

    const commonInputProps = {
      style: [baseStyles.input, baseStyles.greyFont],
      underlineColorAndroid: 'transparent',
      placeholderTextColor: '#AAA',
      autoCorrect: false,
      autoCapitalize: 'none'
    };

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={baseStyles.container}>
          <View style={baseStyles.inputs}>
            <View style={baseStyles.inputContainer}>
              <TextInput
                {...commonInputProps}
                autoFocus={true}
                placeholder='Email'
                keyBoardType='email-address'
                returnKeyType='next'
                value={this.state.email}
                onChangeText={(text) => this.onChangeEmail(text)}
              />
            </View>
            <View style={baseStyles.inputContainer}>
              <TextInput
                {...commonInputProps}
                secureTextEntry={true}
                placeholder='Password'
                returnKeyType='send'
                value={this.state.password}
                onChangeText={(text) => this.onChangePassword(text)}
              />
            </View>
            <View style={{height: 60}}>
              <Button title='Login'
                      onPress={() => this.login()}
                      backgroundColor='#31D8A0'
                      buttonStyle={{marginTop: 10, borderRadius: 5}}/>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(UserActions.login(payload))
})

export default connect(null, mapDispatchToProps)(Login)
