import React, { Component } from "react";

import { WebView, ActivityIndicator,Alert } from "react-native";

export default class MineComponent extends Component {
  constructor(props) {
    super(props);
  }

  /** 
   * //加载百度
  render() {
    return (
      <WebView
        startInLoadingState
        source={{ uri: "https://www.baidu.com" }}
        renderLoading={() => {
          //return <View><Text>这是自定义Loading...</Text></View>
          return <ActivityIndicator size="large" color="#0000ff" />;
        }}
      />
    );
  }
  */
  render() {
    return (
      <WebView
        onMessage={this._onMessage}
        injectedJavaScript="document.getElementById('pid').innerText=888"
        startInLoadingState
        source={require('../../statics/html/test.html')}
        renderLoading={() => {
          //return <View><Text>这是自定义Loading...</Text></View>
          return <ActivityIndicator size="large" color="#0000ff" />;
        }}
      />
    );
  }

  _onMessage = (e) => {
    const dataObj = JSON.parse(e.nativeEvent.data)
    Alert.alert('提示',dataObj.message)
  }
}
