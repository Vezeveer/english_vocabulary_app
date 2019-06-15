import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
//import { NativeRouter, Route, Link } from 'react-router-native';
import Home from './App/Main'

class Redirect extends React.Component {
  state = {
    toggled: false
  }

  toggleComponent = () => {
    this.setState({ toggled: true })
  }

  render() {
    if (!this.state.toggled) {
      return (
        <View style={styles.greet}>
          <Text style={styles.text}>[LOGO placeholder]</Text>
          <Text style={styles.text}>Welcome to vocab_app_alpha.0.0.1</Text>

          <Button onPress={this.toggleComponent} title="Continue" />
        </View>
      )
    }
    return (
      <Home />
    )
  }
}

const styles = StyleSheet.create({
  subNavItem: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "lightgrey",
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  greet: {
    height: '100%',
    zIndex: -1,
    backgroundColor: '#d6d7da',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    margin: 10,
    fontSize: 17
  }
})

export default Redirect;
