import React from 'react'

import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView
} from 'react-native'

/**
 * 
 * @param {*} props 父组件传递过来的值
 * 约定:
 *  props中包含 title、movieType、movieList、navigation
 */
const MovieTypeView = (props) => {
    return <View style={{backgroundColor:'#ffffff'}}>
        {/* 1.0 头部信息 */}
        <TouchableOpacity activeOpacity={0.7} style={{height:35,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:20,paddingRight:20}} onPress={()=>{props.navigation.navigate('MovieList',{title:props.title,movieType:props.movieType})}}>
            <Text>{props.title}</Text>
            <Image style={{width:20,height:20}} source={require('../../../statics/images/arrow-right.png')}/>
        </TouchableOpacity>
        {/* 2.0 展示商品列表的ScrollView */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                props.movieList.map((item,i)=>{
                    return <TouchableOpacity style={{width:150,height:250,marginLeft:5,marginRight:5,alignItems:'center'}} key={i} onPress={()=>{props.navigation.navigate('MovieInfo',{movieId:item.id})}}>
                        <Image source={{uri:item.images.small}} style={{width:150,height:220}} />
                        <Text style={{marginTop:5}}>{item.title.length > 9 ? item.title.substring(0,9)+'...':item.title}</Text>
                    </TouchableOpacity>
                })
            }
        </ScrollView>
    </View>
}

export default MovieTypeView