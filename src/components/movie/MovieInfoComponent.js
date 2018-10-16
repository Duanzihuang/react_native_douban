import React, { Component } from "react";

import { View, Text, ActivityIndicator, ScrollView, Image } from "react-native";

export default class MovieInfoComponent extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title")
        ? navigation.getParam("title")
        : "正在加载中...",
      headerRight: <View />
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      movieInfo: {}
    };
  }
  componentWillMount() {
    fetch(
      `https://api.douban.com/v2/movie/subject/${this.props.navigation.getParam(
        "movieId"
      )}`
    )
      .then(res => res.json())
      .then(data => {
        this.props.navigation.setParams({
          title:
            data.title.length > 9
              ? data.title.substring(0, 9) + "..."
              : data.title
        });
        this.setState({
          isLoading: false,
          movieInfo: data
        });
      });
  }
  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return (
        <ScrollView>
          {/* 1.0 标题 */}
          <Text style={{ fontSize: 28, textAlign: "center", marginTop: 10 }}>
            {this.state.movieInfo.title}
          </Text>
          {/* 2.0 图片  */}
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Image
              style={{ width: 220, height: 250 }}
              source={{ uri: this.state.movieInfo.images.medium }}
            />
          </View>
          {/* 3.0 主要演员 */}
          <Text style={{fontSize:22,marginTop: 10,marginLeft:10}}>主要演员:</Text>
          <ScrollView style={{marginTop: 10,marginLeft:10}} horizontal>
            {this.state.movieInfo.casts.map((item, i) => {
              return <View key={i} style={{alignItems:'center',marginLeft:5,marginRight:5}}>
                  <Image style={{ width: 60, height: 90 }} source={{uri:item.avatars.small}}></Image>
                  <Text>{item.name}</Text>
              </View>;
            })}
          </ScrollView>
          {/* 4.0 电影简介 */}
          <Text style={{fontSize:22,marginTop: 10,marginLeft:10}}>电影简介:</Text>
          <Text style={{fontSize:14,color:'#666',padding:10,lineHeight:35}}>    {this.state.movieInfo.summary}</Text>
        </ScrollView>
      );
    }
  }
}
