
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, FlatList, Button, TouchableHighlight} from 'react-native';

export default class NewsListlPage extends Component {
  static navigationOptions = {
    title: "新闻"
  }
  render() {
    const dataArr = [{
      index: '0',
      stick: true,
      title: '高嵩赴国华电力在印尼企业进行调研',
      department: '产品部',
      releaseTime: '14:00',
      readNum: '5'
    },{
      index: '1',
      stick: false,
      title: '集团党组副书记张国厚为集团中层领导干部专题研修班授课并出席结业仪式…',
      department: '产品部',
      releaseTime: '昨天8:20',
      readNum: '20'
    },{
      index: '2',
      stick: false,
      title: '集团公司外部董事到黑龙江企业区域调研',
      department: '产品部',
      releaseTime: '2018-11-26 8:20',
      readNum: '0'
    }];
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          data = {dataArr}
          renderItem = {({item})=> (
            <TouchableHighlight
              onPress = {()=>navigation.navigate('NewsDetail')}
            >
              <NewsTab {...item}/>
            </TouchableHighlight>)
          }
        />   
      </View>
    );
  }
}
//完整的NewsTab组件
class NewsTab extends Component {
  render () { 
    return (
      <View 
        style={styles.newsTab}
        >
        <NewsImage index = {this.props.index}/>
        <NewsTitle {...this.props}/>
      </View>
    )
  }
}

// 标题组件
class NewsTitle extends Component {
  render () {    
    return (
      <View style = {styles.newsContainer}>
        <Text style = {styles.newsTitle}>{this.props.title}</Text>
        <View style = {styles.newsSatellite}>
          <View style = {{flexDirection :'row'}}>
            <Text style = {styles.stick}>{this.props.stick?'[置顶]':null}</Text>
            <Text style = {[styles.newsSatelliteText, styles.marginR8]}>{this.props.department}</Text>
            <Text style = {styles.newsSatelliteText}>{this.props.releaseTime}</Text>
          </View>
          <View>
            <Text style = {styles.newsSatelliteText}>{this.props.readNum}人浏览</Text>
          </View>    
        </View>
      </View>
    )
  }
}
//内容-图片组件
class NewsImage extends Component {
  render () {
    const icon = (this.props.index == '0')?require('../img/gsfgh.jpg'):(this.props.index == '1'?null:require('../img/jtdhlj.jpg'));
    if(!icon){return null}
    return (
        <Image
          source = {icon}
          style = {styles.imageStyle}
          borderRadius = {3}
        />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f3f3f3"
  },
  newsTab:{
    paddingTop: 14,
  },
  newsContainer:{
    padding: 14,
    paddingLeft: 12,
    backgroundColor: '#fff',
  },
  newsTitle:{
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  newsSatellite:{
    flexDirection:'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingLeft: 3
  },
  newsSatelliteText:{
    fontSize: 14,
    color: '#989898',
  },
  marginR8:{
    marginRight: 8
  },
  imageStyle:{
    width: '100%',
    height: 139,
  },
  stick:{
    fontSize: 12,
    color:'#E60C0C',
    paddingRight: 12
  }
});
