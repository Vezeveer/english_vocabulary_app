import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Button, Text, Image } from "react-native";
import AutoHeightImage from 'react-native-auto-height-image';
import { NativeRouter, Route, Link } from "react-router-native";
import SoundPlayer from 'react-native-sound-player'

const screenWidth = Math.round(Dimensions.get('window').width)
const words = require('../dictionary/testDict.json')


class RenderImageAndAudio extends Component {

  playAudio = () => {
    try {
      SoundPlayer.playSoundFile(this.props.match.params.wordId, 'mp3')
      // or play from url
      //SoundPlayer.playUrl('https://example.com/music.mp3')
    } catch (e) {
      console.log(`cannot play the sound file`, e)
    }
  }

  // Find word in db then return image data
  findImageData = () => {
    let word = this.props.match.params.wordId;
    for (let i = 0; i <= words.words.length; i++) {
      try {
        if (Object.keys(words.words[i])[0] === word) {
          return words.words[i][Object.keys(words.words[i])[0]].uri;
        }
      } catch (err) {
        console.log("Error at findImageData for loop")
      }
    }
  }

  render() {
    return (
      <View>
        <AutoHeightImage
          width={screenWidth - 20}
          source={{
            uri: this.findImageData()
          }}
        />
        <Text style={styles.wordLabel}>{this.props.match.params.wordId}</Text>
        <Button onPress={this.playAudio} title="play audio" />
      </View>
    )

  }
}

class WordMenu extends Component {

  state = {
    currentWords: '',
    iii: ["chair", "bridge", "house"],
    ii: ["building", "door", "table"],
    i: ["car", "tree", "cat", "dog"]
  }

  static getDerivedStateFromProps(props, state) {
    let { wordsId } = props.match.params
    if (wordsId === 'iii') {
      return { currentWords: state.iii }
    } else if (wordsId === 'ii') {
      return { currentWords: state.ii }
    } else if (wordsId === 'i') {
      return { currentWords: state.i }
    }
  }

  render() {
    console.log("the state is now: ", this.state.currentWords)
    return (
      <View>
        <View style={styles.subNavCollection}>
          <Link
            to={`${this.props.match.url}/${this.state.currentWords[0]}`}
            style={styles.subNavItem}
            underlayColor="#547D9C"
          >
            <Text>{this.state.currentWords[0]}</Text>
          </Link>
          <Link
            to={`${this.props.match.url}/${this.state.currentWords[1]}`}
            style={styles.subNavItem}
            underlayColor="#547D9C"
          >
            <Text>{this.state.currentWords[1]}</Text>
          </Link>
          <Link
            to={`${this.props.match.url}/${this.state.currentWords[2]}`}
            style={styles.subNavItem}
            underlayColor="#547D9C"
          >
            <Text>{this.state.currentWords[2]}</Text>
          </Link>
        </View>

        <Route path={`${this.props.match.url}/:wordId`} component={RenderImageAndAudio} />
        <Route
          exact
          path={this.props.match.url}
          render={() => <View style={styles.selectWord}><Text>Select Word</Text></View>}
        />
      </View>
    )
  }
}

export default class App extends Component {

  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <View style={styles.nav}>
            <Link to="/wordmenu/i" underlayColor="#547D9C" style={styles.navItem}>
              <Text>I</Text>
            </Link>
            <Link to="/wordmenu/ii" underlayColor="#547D9C" style={styles.navItem}>
              <Text>II</Text>
            </Link>
            <Link to="/wordmenu/iii" underlayColor="#547D9C" style={styles.navItem}>
              <Text>III</Text>
            </Link>
          </View>


          <Route exact path="/" component={() => {
            return (
              <View style={styles.pleaseSelect}>
                <Text style={{ fontSize: 18 }}>Select any</Text>
              </View>
            )
          }} />
          <Route path="/wordmenu/:wordsId" component={WordMenu} />
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //marginTop: 25,
    padding: 10
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#BCBBC4",
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  subNavCollection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10
  },
  subNavItem: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "lightgrey",
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  wordLabel: {
    textAlign: "center",
    fontSize: 19,
    backgroundColor: '#6CB9F7',
    color: 'white',
    height: 30
  },
  pleaseSelect: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',

  },
  selectWord: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  }
});