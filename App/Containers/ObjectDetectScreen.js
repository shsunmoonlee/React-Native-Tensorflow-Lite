import React, { Component } from 'react'
import {
  AppRegistry,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native';
import ImageClassifier from './AndroidModule'
import { RNCamera } from 'react-native-camera';
import AudioPlayer from 'react-native-audioplayer';
import RNFS from 'react-native-fs';
import { connect } from 'react-redux'
import axios from 'axios'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  whatsThisButton: {
    backgroundColor: '#18bc9c',
    padding: 15
  },
  whatsThisButtonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center'
  },
  detailActions: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  languageButton: {
    flex:1,
    backgroundColor: '#95a5a6',
    padding: 15
  },
  languageButtonText: {
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'center'
  },
  listenButton: {
    flex:1,
    backgroundColor: '#2c3e50',
    padding: 15
  },
  listenButtonText: {
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'center'
  },
  translationBox: {

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class ObjectDetectScreen extends Component {
  state = {
    capturedImage: '',
    isUploading: false,
    uploadProgress: 0,
    showResult: false,
    results: []
  }
  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log("===inside take picture!")
      console.log(data.uri);

      this.setState({
        capturedImage: data,
        isUploading: true,
        // capturedImage: '/Users/northfoxz/Documents/TIL/tensorflow/learn/x.jpg'
      })

      const url = 'http://localhost:8000'
      const fileName = data.uri.split('/')[data.uri.split('/').length - 1]
      const someData = { url, type: 'image/jpeg', name: fileName }
      const postData = {
        fileName,
        someData,
      }
      const headers = { 'content-type': 'application/x-www-form-urlencoded' }
      const apiOptions = {
        method: 'POST',
        headers: headers,
        data: postData,
        url,
      };

      try {
        const results = await axios.post(apiOptions)
        this.setState({
          isUploading: false,
          results
        });
      } catch (error) {
        console.error(error);
      }
      // var url = '/Users/northfoxz/Documents/TIL/tensorflow/learn/x.jpg'
      // var uploadUrl = "http://localhost:8000"
      // xhr.open('POST', uploadUrl, true)
      // xhr.setRequestHeader('Content-Type', 'multipart/form-data')
      // var formData = new FormData();
      // var fileName = data.split('/')[data.split('/').length - 1];
      // formData.append(fileName, {uri: url, type: 'image/jpeg', name: fileName});
      // xhr.send(formData)

    }
  };

  _onBarCodeRead(e) {
    console.log(e);
  }
  _switchCamera() {
    var state = this.state;
  }
  // _takePicture() {
  //   this.camera.takePicture();
  // },
  // _onPictureTaken(event) {
  //   console.log("===onPictureTaken!", event)
  //   if(event.type !== 'error') {
  //     var data = 'file://' + event.message
  //
  //     this.setState({
  //       capturedImage: data
  //       // capturedImage: '/Users/northfoxz/Documents/TIL/tensorflow/learn/x.jpg'
  //     })
  //     var xhr = new XMLHttpRequest();
  //     xhr.onload = () => {
  //       this.setState({
  //         isUploading: false
  //       });
  //       if (xhr.status !== 200) {
  //         Alert.alert(xhr.status);
  //         return;
  //       }
  //       if (!xhr.responseText) {
  //         Alert.alert(JSON.stringify(xhr.responseText));
  //         return;
  //       }
  //       this.setState({
  //         results: JSON.parse(xhr.responseText)
  //       })
  //     };
  //     var url = data;
  //     var uploadUrl = 'http://scdb.standardcart.com:8000';
  //     // var url = '/Users/northfoxz/Documents/TIL/tensorflow/learn/x.jpg'
  //     // var uploadUrl = "http://localhost:8000"
  //     xhr.open('POST', uploadUrl, true)
  //     xhr.setRequestHeader('Content-Type', 'multipart/form-data')
  //     var formData = new FormData();
  //     var fileName = data.split('/')[data.split('/').length - 1];
  //     formData.append(fileName, {uri: url, type: 'image/jpeg', name: fileName});
  //     xhr.send(formData)
  //   }
  // }
  _backToTakePicture() {
    this.setState({
      capturedImage: '',
      results: []
    })
  }
  _changeLanguage() {

  }
  _listen() {
    // https://translate.google.com/translate_tts?ie=UTF-8&q=hello&tl=en-US&client=tw-ob
    var query = encodeURI(this.state.results[0]);
    RNFS.downloadFile('https://translate.google.com/translate_tts?ie=UTF-8&q=' + query + '&tl=en-US&client=tw-ob', RNFS.DocumentDirectoryPath + '/translate.mp3')
      .then((success) => {
        // console.log(RNFS.DocumentDirectoryPath + '/translate.mp3');
        AudioPlayer.play(RNFS.DocumentDirectoryPath + '/translate.mp3');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  _listenByIndex(index) {
    console.log(index);
    var query = encodeURI(this.state.results[index]);
    RNFS.downloadFile('https://translate.google.com/translate_tts?ie=UTF-8&q=' + query + '&tl=en-US&client=tw-ob', RNFS.DocumentDirectoryPath + '/translate.mp3')
      .then((success) => {
        // console.log(RNFS.DocumentDirectoryPath + '/translate.mp3');
        AudioPlayer.play(RNFS.DocumentDirectoryPath + '/translate.mp3');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }


  render () {
    let resultView = [];
    if(this.state.results.length == 0) {
      resultView = <Text style={{color:'#ffffff',fontSize:25,textAlign:'center'}}>I dont know...</Text>
    } else {
      this.state.results.map((result, index) => {
        resultView.push(
          <ResultItem
            key={result_i}
            resultIndex={result_i}
            listenByIndex={() => this._listenByIndex()}
            result={this.state.results[result_i]} />
        )
      })
    }
    return (
      <View style={{flex: 1, }}>
        {this.state.capturedImage == '' ?
          <View style={{flex: 1,}}>
            <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
                borderStrokeWidth={50}
                viewFinderDisplay={false}
                viewFinderDrawLaser={true}
                torchMode={"off"}
                style={styles.container}
                onBarCodeRead={() => this._onBarCodeRead()}
            />
            <TouchableHighlight
              underlayColor={'#128f76'}
              style={styles.whatsThisButton}
              onPress={() => this.takePicture()}>
              <Text
                style={styles.whatsThisButtonText}>WHATS THIS?</Text>
            </TouchableHighlight>
          </View> :
          <View style={{flex:1,backgroundColor:'#555555',flexDirection:'column',alignItems:'stretch'}}>
            <Image
              style={styles.container}
              source={{uri: this.state.capturedImage}}>
              <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0)'}}>
                <View style={{width:200,height:300,backgroundColor:'rgba(0,0,0,0.3)',justifyContent:'space-between'}}>
                  <Text style={{color:'#ffffff',fontSize:20,margin:15}}>This is:</Text>
                  <View>
                    {this.state.results.length == 0?
                        <Image
                          source={require('../../images/translating.gif')} />:
                        resultView
                    }
                  </View>
                  <View
                    style={styles.detailActions}>
                    <TouchableHighlight
                      underlayColor={'#798d8f'}
                      style={styles.languageButton}
                      onPress={() => this._changeLanguage()}>
                      <Text
                        style={styles.languageButtonText}>ENGLISH</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor={'#1a242f'}
                      style={styles.listenButton}
                      onPress={() => this._listen()}>
                      <Text
                        style={styles.listenButtonText}>LISTEN</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </Image>
            <TouchableHighlight
              underlayColor={'#128f76'}
              style={styles.whatsThisButton}
              onPress={() => this._backToTakePicture()}>
              <Text
                style={styles.whatsThisButtonText}>WHATS THIS?</Text>
            </TouchableHighlight>
            </View>
          }
      </View>
    )
  }
}
// <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
//   <TouchableOpacity
//       onPress={this.takePicture.bind(this)}
//       style = {styles.capture}
//   >
//       <Text style={{fontSize: 14}}> SNAP </Text>
//   </TouchableOpacity>
// </View>
const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectDetectScreen)
