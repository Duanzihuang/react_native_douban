import React, { Component } from "react";

import { View, Image, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

import Carousel from "react-native-looped-carousel";

var styles = StyleSheet.create({
  images: {
    width: "100%",
    height: "100%"
  },
  navigationBar: {
    height: 50,
    backgroundColor: "orange",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
});

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: { width, height: 250 }
    };
  }
  render() {
    return (
      <View>
        {/* 1.0 轮播图 */}
        <View style={this.state.size}>
          <Carousel
            delay={3000}
            style={this.state.size}
            autoplay
            bullets
            arrows
            leftArrowText={"＜"}
            leftArrowStyle={{ color: "white", fontSize: 30, margin: 20 }}
            rightArrowText={"＞"}
            rightArrowStyle={{ color: "white", fontSize: 30, margin: 20 }}
          >
            <View style={this.state.size}>
              <Image
                style={styles.images}
                resizeMode="stretch"
                source={{
                  uri:
                    "http://www.itcast.cn/images/slidead/BEIJING/2017410109413000.jpg"
                }}
              />
            </View>
            <View style={this.state.size}>
              <Image
                style={styles.images}
                resizeMode="stretch"
                source={{
                  uri:
                    "http://www.itcast.cn/images/slidead/BEIJING/2017440109442800.jpg"
                }}
              />
            </View>
            <View style={this.state.size}>
              <Image
                style={styles.images}
                resizeMode="stretch"
                source={{
                  uri:
                    "http://www.itcast.cn/images/slidead/BEIJING/2017441409442800.jpg"
                }}
              />
            </View>
          </Carousel>
        </View>

        {/* 2.0 导航条 */}
        <View style={styles.navigationBar}>
          <Text>首 页</Text>
          <Text
            onPress={() => {
              this.props.navigation.navigate("Movie");
            }}
          >
            电 影
          </Text>
          <Text
            onPress={() => {
              this.props.navigation.navigate("Mine");
            }}
          >
            我 的
          </Text>
        </View>
      </View>
    );
  }
}
