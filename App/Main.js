import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Button, Text, Image } from "react-native";

import AutoHeightImage from 'react-native-auto-height-image';
import { NativeRouter, Route, Link } from "react-router-native";

import SoundPlayer from 'react-native-sound-player'
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

const img1 = require('../img/169.jpg')
const screenWidth = Math.round(Dimensions.get('window').width)
const words = require('../dictionary/testDict.json')


class One extends Component {

  render() {
    return (
      <View>
        <View style={styles.subNavCollection}>
          <Link
            to={`${this.props.match.url}/rendering`}
            style={styles.subNavItem}
            underlayColor="#547D9C"
          >
            <Text>Rendering with React</Text>
          </Link>
          <Link
            to={`${this.props.match.url}/components`}
            style={styles.subNavItem}
            underlayColor="#547D9C"
          >
            <Text>Components</Text>
          </Link>
          <Link
            to={`${this.props.match.url}/props-v-state`}
            style={styles.subNavItem}
            underlayColor="#547D9C"
          >
            <Text>Props v. State</Text>
          </Link>
        </View>



        <Route path={`${this.props.match.url}/:topicId`} component={Topic} />
        <Route
          exact
          path={this.props.match.url}
          render={() => <View style={styles.selectWord}><Text>Select Word</Text></View>}
        />
      </View>
    );
  }
}

// ONE ENDS HERE ########

function Two({ match }) {
  return (
    <View>
      <View style={styles.subNavCollection}>
        <Link
          to={`${match.url}/rendering`}
          style={styles.subNavItem}
          underlayColor="#547D9C"
        >
          <Text>Rendering with React</Text>
        </Link>
        <Link
          to={`${match.url}/components`}
          style={styles.subNavItem}
          underlayColor="#547D9C"
        >
          <Text>Components</Text>
        </Link>
        <Link
          to={`${match.url}/props-v-state`}
          style={styles.subNavItem}
          underlayColor="#547D9C"
        >
          <Text>Props v. State</Text>
        </Link>
      </View>



      <Route path={`${match.url}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.url}
        render={() => <View style={styles.selectWord}><Text>Select Word</Text></View>}
      />
    </View>
  );
}

// TWO ENDS HERE #########

const Topic = ({ match }) => {
  console.log("Topic went thru.")
  return (
    <View>
      <Text style={styles.topic}>{match.params.topicId}</Text>
      <Text style={styles.topic}>{match.params.topicId}</Text>
      <Text>YOLO</Text>
    </View>
  );
}

class ProcessWord extends React.Component {

  state = {
    currentWord: 'chair'
  }

  playAudio = () => {
    try {
      // play the file tone.mp3
      SoundPlayer.playSoundFile(this.props.match.params.wordId, 'mp3')
      // or play from url
      //SoundPlayer.playUrl('https://example.com/music.mp3')
    } catch (e) {
      console.log(`cannot play the sound file`, e)
    }
  }

  findWord = () => {
    console.log("find word went thru...")
    const word = this.calcWord();
    //console.log("THe Word IS: ", word)
    // this.setState({
    //   currentWord: word
    // })
  }

  calcWord = () => {
    let word = this.props.match.params.wordId;
    console.log("WordId: ", word)
    let keys = Object.keys(words.words);
    for (let i = 0; i <= words.words.length; i++) {
      try {
        if (Object.keys(words.words[i])[0] === word) {
          console.log("KEY FOUND: ", Object.keys(words.words[i])[0])
          let wordFound = Object.keys(words.words[i])[0];
          return words.words[i][wordFound].uri;
          //console.log("CalcWord returned: ", words.words[word].uri)
          //return words.words[word].uri
        }
      } catch (err) {
        console.log("Error at calcWord for loop")
      }
    }
  }

  render() {
    //this.findWord();
    console.log("From console render: ", this.state.currentWord)
    return (
      <View>
        <AutoHeightImage
          width={screenWidth - 20}
          source={{
            uri: this.calcWord()
          }}
        />
        <Text style={styles.wordLabel}>{this.props.match.params.wordId}</Text>
        <Button onPress={this.playAudio} title="play audio" />
      </View>
    )

  }
}

class Three extends React.Component {

  state = {
    currentWords: '',
    iii: ["chair", "bridge", "house"],
    ii: ["building", "door", "table"]
  }

  componentWillMount() {
    let { wordsId } = this.props.match.params
    if (wordsId === 'iii') {
      this.setState({
        currentWords: this.state.iii
      })
    } else if (wordsId === 'ii') {
      this.setState({
        currentWords: this.state.ii
      })
    }
  }

  render() {
    console.log("the state is now: ", this.state.currentWords)
    return (
      <View>
        <View style={styles.subNavCollection}>
          <Link
            to={`${this.props.match.url}/chair`}
            style={styles.subNavItem}
            underlayColor="#547D9C"
          >
            <Text>chair</Text>
          </Link>
          <Link
            to={`${this.props.match.url}/bridge`}
            style={styles.subNavItem}
            underlayColor="#547D9C"
          >
            <Text>bridge</Text>
          </Link>
          <Link
            to={`${this.props.match.url}/house`}
            style={styles.subNavItem}
            underlayColor="#547D9C"
          >

            <Text>house</Text>
          </Link>
        </View>

        <Route path={`${this.props.match.url}/:wordId`} component={ProcessWord} />
        <Route
          exact
          path={this.props.match.url}
          render={() => <View style={styles.selectWord}><Text>Select Word</Text></View>}
        />
      </View>
    )
  }
}

// THREE ENDS HERE #############

const Choose = () => {
  return (
    <View style={styles.pleaseSelect}>
      <Text style={{ fontSize: 18 }}>Select any</Text>

    </View>

  )
}

export default class App extends Component {

  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <View style={styles.nav}>
            <Link to="/One" underlayColor="#547D9C" style={styles.navItem}>
              <Text>I</Text>
            </Link>
            <Link to="/Two" underlayColor="#547D9C" style={styles.navItem}>
              <Text>II</Text>
            </Link>
            <Link to="/Three/iii" underlayColor="#547D9C" style={styles.navItem}>
              <Text>III</Text>
            </Link>
          </View>


          <Route exact path="/" component={Choose} />
          {/*<Route exact path="/" component={Home} />*/}
          <Route path="/One" component={One} />
          <Route path="/Two" component={Two} />
          <Route path="/Three/:wordsId" component={Three} />
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