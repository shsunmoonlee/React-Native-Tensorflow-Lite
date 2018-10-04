'use strict';
import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import { connect } from 'react-redux'

import {GiftedChat} from 'react-native-gifted-chat';
// import ChatActions from '../Redux/Chat'
import feathers from '../Components/feathers'

const maxHeight = Platform.OS === 'ios' ? Dimensions.get('window').height - 65 : Dimensions.get('window').height - 85;

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      isConnecting: false,
      user: null,
      messages: [],
      hasMoreMessages: false,
      skip: 0,
    }

    // this.store = this.props.screenProps.store;
  }
  formatMessage(message) {
    return {
      _id: message._id,
      text: message.text,
      position: message.user._id.toString() === this.props.user._id.toString() ? 'left' : 'right',
      createdAt: new Date(message.createdAt),
      user: {
        _id: message.user._id ? message.user._id : '',
        name: message.user.email ? message.user.email : message.name,
        avatar: message.user.avatar ? message.user.avatar : PLACEHOLDER,
      }
    };
  }
  sendMessage(messages = {}, rowID = null) {
    feathers.service('messages').create({text: messages[0].text}).then(result => {
      console.log('message created!');
    }).catch((error) => {
      console.log('ERROR creating message');
      console.log(error);
    });
  }
  loadMessages(loadNextPage) {
    let $skip = this.state.skip;
    const query = {query: {$sort: {createdAt: -1}, $skip}};

    feathers.service('messages').find(query).then(response => {
      const messages = [];
      const skip = response.skip + response.limit;

      for (let message of response.data) {
        console.log("===message", message)
        messages.push(this.formatMessage(message));
      }

      console.log('loaded messages from server', JSON.stringify(messages, null, 2));
      if (!loadNextPage) {
        // this.messages = messages;
        this.setState({messages})
      } else {
        // this.messages = this.messages.concat(messages);
        this.setState((prevState, props) => { messages: prevState.messages.concat(messages) })
      }
      // this.skip = skip;
      // this.hasMoreMessages = response.skip + response.limit < response.total;
      const hasMoreMessages = response.skip + response.limit < response.total;
      this.setState({skip, hasMoreMessages })

    }).catch(error => {
      console.log(error);
    });
  }
  deleteMessage(messageToRemove) {
    let messages = [...this.state.messages];
    let idToRemove = messageToRemove.id ? messageToRemove.id : messageToRemove._id;

    messages = messages.filter(function (message) {
      return message.id !== idToRemove;
    });
    this.setState((prevState, props) => {

      return {messages}
    })
  }
  componentDidMount() {
    this.loadMessages()
    feathers.service('messages').on('created', createdMessage => {
      // TODO
      //implement redux for this
      console.log("===created messages", createdMessage)
      console.log("===formatted created messages", this.formatMessage(createdMessage))
      console.log("===this.state.messages", this.state.messages, [...this.state.messages])
      const newMessages = [...this.state.messages]
      newMessages.unshift(this.formatMessage(createdMessage))
      console.log("===newMessages", newMessages)
      this.setState((prevState, props) => {messages: newMessages})
      // this.state.messages.unshift(this.formatMessage(createdMessage));
    });

    feathers.service('messages').on('removed', removedMessage => {
      console.log("===removed messages", removedMessage)

      this.deleteMessage(removedMessage);
    });    
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // Typical usage (don't forget to compare props):
    // if (this.props !== prevProps) {
    //   this.loadMessages();
    // }
  }
  render() {
    console.log("=====Chat this.props.user", this.props.user)
    console.log("=====Chat this.props", this.props)
    return (
      <View style={styles.container}>
        {this.state.messages.length > 0 && <GiftedChat
          ref={(c) => this._GiftedMessenger = c}
          user={{_id: this.props.user._id}}
          messages={this.state.messages.slice()}
          onSend={this.sendMessage}
          loadEarlier={this.state.hasMoreMessages}
          onLoadEarlier={this.loadMessages.bind(this, true)}
          keyboardDismissMode='on-drag'
          autoFocus={false}
          maxHeight={maxHeight}
        />}
        {this.state.isConnecting && <View style={styles.banner}>
          <Text style={styles.bannerText}>Reconnecting ...</Text>
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white'
  },
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 5,
    backgroundColor: '#E98B50',
    opacity: 0.8
  },
  bannerText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 13,
    textAlign: 'center'
  },
  settings: {
    marginRight: 10
  }
});

const mapStateToProps = (state) => {
  console.log("===redux state tree", state)
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => ({
  // loadMessages: (payload) => dispatch(ChatActions.loadMessages(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
