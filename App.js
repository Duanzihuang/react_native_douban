/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Image } from "react-native";

import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import HomeComponent from "./src/components/home/HomeComponent";
import MovieComponent from "./src/components/movie/MovieComponent";
import MineComponent from "./src/components/mine/MineComponent";
import MovieListComponent from "./src/components/movie/MovieListComponent"
import MovieInfoComponent from './src/components/movie/MovieInfoComponent'

//创建首页独立的Navigation
const HomeStack = createStackNavigator({
  Home: {
    screen:HomeComponent,
    // 如果是静态的，就可以写死在这里，如果是动态的，不要在这里写，应该在每个组件中进行设置
    navigationOptions:{
      headerTitle:'首 页',
      // headerTintColor:'#ff0000',
      headerTitleStyle :{
        flex:1,
        textAlign:'center'
      }
    }
  }
});

//创建电影独立的Navigation
const MovieStack = createStackNavigator({
  Movie: {
    screen:MovieComponent,
    navigationOptions:{
      headerTitle:'电 影',
      headerTitleStyle :{
        flex:1,
        textAlign:'center'
      }
    }
  },
  MovieList:{
    screen:MovieListComponent,
    navigationOptions:{
      headerTitleStyle :{
        flex:1,
        textAlign:'center'
      }
    }
  },
  MovieInfo:{
    screen:MovieInfoComponent,
    navigationOptions:{
      // headerTitle:'电影详情',
      headerTitleStyle :{
        flex:1,
        textAlign:'center'
      }
    }
  }
});

//创建我的独立的Navigation
const MineStack = createStackNavigator({
  Mine: {
    screen:MineComponent,
    navigationOptions:{
      headerTitle:'我 的',
      headerTitleStyle :{
        flex:1,
        textAlign:'center'
      }
    }
  }
});

// 设置TabBar
const TabBar = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: "首页",
      //focused代表你当前的TabBar是否选中,tintColor就是设置的前景色
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <Image
            source={
              focused
                ? require("./src/statics/images/tarBar/home_selected.png")
                : require("./src/statics/images/tarBar/home_normal.png")
            }
            style={{ tintColor: tintColor, width: 25, height: 25 }}
          />
        );
      }
    }
  },
  Movie: {
    screen: MovieStack,
    navigationOptions: ({navigation})=>{
      return {
        tabBarVisible:navigation.state.routes.length < 2,
        tabBarLabel: "电影",
        tabBarIcon: ({ focused, tintColor }) => {
          return (
            <Image
              source={
                focused
                  ? require("./src/statics/images/tarBar/movie_selected.png")
                  : require("./src/statics/images/tarBar/movie_normal.png")
              }
              style={{ tintColor: tintColor, width: 25, height: 25 }}
            />
          );
        }
      }
    }
  },
  Mine: {
    screen: MineStack,
    navigationOptions: {
      tabBarLabel: "我的",
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <Image
            source={
              focused
                ? require("./src/statics/images/tarBar/mine_selected.png")
                : require("./src/statics/images/tarBar/mine_normal.png")
            }
            style={{ tintColor: tintColor, width: 25, height: 25 }}
          />
        );
      }
    }
  }
},{
  // lazy :false,
  tabBarOptions :{
    activeTintColor:'black',
    inactiveTintColor :'gray'
  }
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <TabBar />;
  }
}
