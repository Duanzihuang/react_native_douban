import React, { Component } from "react";

import { View, Text,Image, ActivityIndicator,TouchableOpacity } from "react-native";

import RefreshListView, { RefreshState } from "react-native-refresh-list-view";

export default class MovieListComponent extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title"),
      headerRight: <View />
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      refreshState: RefreshState.Idle, //刷新状态
      isLoading: true,
      movieType: props.navigation.getParam("movieType"),
      pageIndex: 1, //页码
      pageSize: 10, //每页的页容量
      total: 0, //总条数
      movieList: [] //加载出来的电影数组
    };
  }
  componentWillMount() {
    // 加载第一页的数据
    this.getMovieListData();
  }
  getMovieListData() {
    const start = (this.state.pageIndex - 1) * this.state.pageSize;

    if(start > this.state.total){
      this.setState({
        refreshState: RefreshState.NoMoreData
      })
      return
    }

    const url = `https://api.douban.com/v2/movie/${
      this.state.movieType
    }?start=${start}&count=${this.state.pageSize}`;

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          total:res.total,
          isLoading: false,
          refreshState: start < res.total ? RefreshState.Idle : RefreshState.NoMoreData,
          movieList: this.state.movieList.concat(res.subjects)
        });
      });
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return (
        <RefreshListView
          data={this.state.movieList}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderCell}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.onHeaderRefresh}
          onFooterRefresh={this.onFooterRefresh}
        />
      );
    }
  }

  // 下拉刷新
  onHeaderRefresh = () => {
    this.setState({
      refreshState: RefreshState.HeaderRefreshing,
      pageIndex:1,
      movieList:[]
    })
    
    this.getMovieListData()
  };

  //上拉加载更多
  onFooterRefresh = () => {
    this.setState({
      refreshState: RefreshState.FooterRefreshing,
      pageIndex:++this.state.pageIndex
    })

    this.getMovieListData()
  };

  renderCell = ({ item }) => {
    return (
      <TouchableOpacity style={{ borderBottomColor: "#eee",flexDirection:'row', borderBottomWidth: 1,backgroundColor:'#ffffff',padding: 8}} activeOpacity={0.7} onPress={()=>{this._goToMovieInfo(item.id)}}>
        <Image
          style={{ width: 100, height: 140, marginRight: 8 }}
          source={{ uri: item.images.medium }}
        />
        <View style={{ justifyContent: "space-between" }}>
          <Text>电影名称:{item.title}</Text>
          <Text>电影类型:{item.genres.join(",")}</Text>
          <Text>上映年份:{item.year}</Text>
          <Text>豆瓣评分:{item.rating.average}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  _goToMovieInfo = (movieId) => {
    this.props.navigation.navigate('MovieInfo',{movieId})
  }
}
