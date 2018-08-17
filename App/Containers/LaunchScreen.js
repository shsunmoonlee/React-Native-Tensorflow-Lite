import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
// import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import {Button} from 'react-native-elements';
import { connect } from 'react-redux'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  _showLogin() {
    console.log("====LaunchScreen this.props", this.props)
    this.props.navigation.navigate('Login');
  }

  _showSignup() {
    this.props.navigation.navigate('Signup');
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Image source={require('../Images/feathers_logo_wide.png')} style={styles.logo}/>
          <Text style={styles.tagline}>Chat Demo</Text>
        </View>
        <View style={styles.bottomSection}>
          <Button title='Sign In'
                  onPress={() => this._showLogin()}
                  backgroundColor='#BBB'
                  buttonStyle={{borderRadius: 5}}/>
          <Button title='Create Account'
                  onPress={() => this._showSignup()}
                  backgroundColor='#31D8A0'
                  buttonStyle={{marginTop: 10, borderRadius: 5}}/>
        </View>
      </View>
    );
    // return (
    //   <View style={styles.mainContainer}>
    //     <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
    //     <ScrollView style={styles.container}>
    //       <View style={styles.centered}>
    //         <Image source={Images.launch} style={styles.logo} />
    //       </View>
    //
    //       <View style={styles.section} >
    //         <Image source={Images.ready} />
    //         <Text style={styles.sectionText}>
    //           This probably isn't what your app is going to look like. Unless your designer handed you this screen and, in that case, congrats! You're ready to ship. For everyone else, this is where you'll see a live preview of your fully functioning app using Ignite.
    //         </Text>
    //       </View>
    //
    //       <DevscreensButton />
    //     </ScrollView>
    //   </View>
    // )
  }
}
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
})

export default connect(null, mapDispatchToProps)(LaunchScreen)
