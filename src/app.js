import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm.js'

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
    apiKey: "AIzaSyCmUWvKg3V7P8euLThFtKYuqCU7pUvn3i4",
    authDomain: "auth-e88d5.firebaseapp.com",
    databaseURL: "https://auth-e88d5.firebaseio.com",
    projectId: "auth-e88d5",
    storageBucket: "auth-e88d5.appspot.com",
    messagingSenderId: "558706704168"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({loggedIn: true});
      }
      else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent() {
    switch(this.state.loggedIn) {
      case true:
        return (
          <Button onPress={()=> firebase.auth().signOut()}>Log out</Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large' />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication"></Header>
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
