/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  PanResponder,
  ScrollView,
  Image,
  Slider
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREN_HEIGHT = Dimensions.get('window').height;
const SCREN_WIDTH = Dimensions.get('window').width;

type Props = {};
export default class App extends Component<Props> {

  componentWillMount(){
      this.animation = new Animated.ValueXY({x:0, y:SCREN_HEIGHT-80});
  }

  render() {
      const animatedHeigth = {
          transform : this.animation.getTranslateTransform()
      }
    return (
      <Animated.View
          style={{flex:1, backgroundColor:'white'}}>
          <Animated.View
              style ={
                  [ animatedHeigth,
                    {
                        position:'absolute',
                        left:0,
                        right:0,
                        zIndex:10,
                        backgroundColor:'white',
                        height:SCREN_HEIGHT
                    }
                  ]
              } >
              <Animated.View style={{height:80, borderTopWidth:1, borderTopColor:'#ebe5e5', flexDirection:'row', alignItems:'center'}}>
                  <View style={{flex:4, flexDirection:'row', alignItems:'center'}}>
                      <Animated.View style={{height:32, width:32, marginLeft:10}}>
                          <Image style={{flex:1, width:null, height:null}} source={require('./assets/me.png')}/>
                      </Animated.View>
                      <Animated.Text style={{opacity:1, fontSize:18, paddingLeft:10}}>Hotel california</Animated.Text>
                  </View>
                  <Animated.View style={{flex:1, flexDirection:'row', opacity:1, justifyContent:'space-around'}}>
                      <Icon name='pause' size={32} style={{ color: 'black' }}/>
                      <Icon name='play' size={32} style={{ color: 'black' }}/>
                  </Animated.View>
              </Animated.View>
          </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
