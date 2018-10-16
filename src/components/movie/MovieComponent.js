import React, { Component } from "react";

import { ScrollView, View,ActivityIndicator } from "react-native";

import MovieTypeView from "./view/MovieTypeView";

// import { EasyLoading } from 'react-native-easy-loading'

export default class MovieComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true, //是否正在加载
      inTheatersMovieList: [], //正在热映的电影数组
      comingSoonMovieList: [], //即将上映的电影数组
      top250MovieList: [] //top250
    };
  }
  componentDidMount(){
    // EasyLoading.show('正在加载中...', 3000, 'type');
    //我们要等三种类型的数据，都回来之后，才可以渲染页面
    //那就意味着，我们要等三个异步请求都回来之后，才进行渲染
    //这个时候我们就需要使用某种机制保证三个异步请求都执行完毕啦
    //就可以使用Promise.all方法来监控 参考: http://es6.ruanyifeng.com/#docs/promise#Promise-all

    Promise.all([fetch('https://api.douban.com/v2/movie/in_theaters?start=0&count=10').then(res=>res.json()),fetch('https://api.douban.com/v2/movie/coming_soon?start=0&count=10').then(res=>res.json()),fetch('https://api.douban.com/v2/movie/top250?start=0&count=10').then(res=>res.json())]).then(results=>{
      // EasyLoading.dismis()

      //给模型赋值
      this.setState({
        isLoading:false,
        inTheatersMovieList:results[0].subjects,
        comingSoonMovieList:results[1].subjects,
        top250MovieList:results[2].subjects
      })
    })
  }
  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#0000ff"/>;
      // return <Loading type={"type"} loadingStyle={{ backgroundColor: "#f007" }} />
    } else {
      return (
        <ScrollView>
          {/* 1.0 正在热映 */}
          <MovieTypeView title="正在热映" movieList={this.state.inTheatersMovieList} movieType="in_theaters" navigation={this.props.navigation}/>

          {/* 2.0 正在热映 */}
          <View style={{ marginTop: 20 }}>
            <MovieTypeView title="即将上映" movieList={this.state.comingSoonMovieList} movieType="coming_soon" navigation={this.props.navigation}/>
          </View>

          {/* 2.0 Top250 */}
          <View style={{ marginTop: 20 }}>
            <MovieTypeView title="Top250" movieList={this.state.top250MovieList} movieType="top250" navigation={this.props.navigation}/>
          </View>
        </ScrollView>
      );
    }
  }
}
