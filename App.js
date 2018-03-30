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

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {};
export default class App extends Component<Props> {

  componentWillMount(){
      this.animation = new Animated.ValueXY({x:0, y:SCREEN_HEIGHT-90});

      this.panResponder = PanResponder.create({
          
          onMoveShouldSetPanResponder:()=>true,

          onPanResponderGrant:(evt,gestureState)=>{
              this.animation.extractOffset()
          },

          onPanResponderMove:(evt,gestureState)=>{
              this.animation.setValue({x:0,y:gestureState.dy})
          },

          onPanResponderRelease:(evt,gestureState)=>{
              if (gestureState.dy < 0 ){
                  Animated.spring(this.animation.y,{
                      toValue: -SCREEN_HEIGHT + 120,
                      tension: 1
                  }).start()
              }
              else if(gestureState>0){
                  Animated.spring(this.animation.y,{
                      toValue: SCREEN_HEIGHT - 120,
                      tension: 1
                  }).start()
              }
          }
      })
  }

  render() {
      const animatedHeigth = {
          transform : this.animation.getTranslateTransform()
      };
      animatedImageHeight = this.animation.y.interpolate({
          inputRange:[0,SCREEN_HEIGHT - 90],
          outputRange:[200, 32],
          extrapolate: 'clamp'
      });
      animatedSongTitleOpacity = this.animation.y.interpolate({
          inputRange:[0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
          outputRange:[0, 0, 1],
          extrapolate: 'clamp'
      });
      animatedImageMarginLeft = this.animation.y.interpolate({
          inputRange:[0, SCREEN_HEIGHT - 90],
          outputRange:[SCREEN_WIDTH / 2 - 100, 10],
          extrapolate: 'clamp'
      });
      animatedHeaderHeight = this.animation.y.interpolate({
          inputRange:[0, SCREEN_HEIGHT - 90],
          outputRange:[SCREEN_HEIGHT / 2 ,90],
          extrapolate: 'clamp'
      });
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
                        height:SCREEN_HEIGHT
                    }
                  ]
              } >
              <Animated.View
                  {... this.panResponder.panHandlers}
                  style={{height:animatedHeaderHeight, borderTopWidth:1, borderTopColor:'#ebe5e5', flexDirection:'row', alignItems:'center'}}>
                  <View style={{flex:4, flexDirection:'row', alignItems:'center'}}>
                      <Animated.View style={{height:animatedImageHeight, width:animatedImageHeight, marginLeft:animatedImageMarginLeft}}>
                          <Image style={{flex:1, width:null, height:null}} source={require('./assets/me.png')}/>
                      </Animated.View>
                      <Animated.Text style={{opacity:animatedSongTitleOpacity, fontSize:18, paddingLeft:10}}>Hotel california</Animated.Text>
                  </View>
                  <Animated.View style={{flex:1, flexDirection:'row', opacity:animatedSongTitleOpacity, justifyContent:'space-around'}}>
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
