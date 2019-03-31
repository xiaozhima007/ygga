

import React, {Component} from 'react';
import {
  Platform, StyleSheet, Text,
  View,StatusBar,SectionList,
  SafeAreaView,FlatList,
  TouchableOpacity,Dimensions,Image,ImageBackground,Alert
} from 'react-native';
import CustomIconFont from '../Main/CustomIconFont';

const {width,height}=Dimensions.get('window');

const sections = [
  {key:'content',data:[{key:'system_help',title:'帮助',color:'#7CB305'},{key:'system_about',title:'关于',color:'#D48806'}]}
  
];

export default class Mine extends Component {
  constructor(props){
    super(props);

  }

    _goToMineDetail(){
      this.props.navigation.navigate('MineDetail');
    }

    _onPressCallBack(position){
      switch(position){
        case 0:
              this.props.navigation.navigate('MineDetail');
              break;
        case 1:
              this.props.navigation.navigate('MineDetail');
              break;
      }
    }

    _goToUpdateSettingPage(){
      this.props.navigation.navigate('Setting');
    }

    //设置分组列表头部视图
    _sectionHeaderComponent (){
      return <View style={styles.headerContainer}>
           {/* <ImageBackground 
           style={styles.ImageBackground} 
           source={require('./images/sun.jpg')}> */}
              <TouchableOpacity style={{marginLeft:width-40}} onPress={this._goToMineDetail.bind(this)}>
                <CustomIconFont name='right' color='white' size={20}/>
              </TouchableOpacity>
              <Image style={styles.imageHeader} source={{uri:'Mine_header'}}/>
              <Text style={styles.userName}>张三</Text>
           {/* </ImageBackground> */}
           
      </View>
      
     
  }

  //设置分组列表尾部视图
  _sectionFooterComponent(){
    return(
      <TouchableOpacity style={{height:52,backgroundColor:'#FFFFFF',marginTop:20}}  onPress={this._goToUpdateSettingPage.bind(this)}>
        <View style={{flex:1,alignItems:'center',marginLeft:10,flexDirection:'row'}}>
          <CustomIconFont name='icon_shezhi' color='#3176AF' size={21}/>
          <Text style={{marginLeft:20,fontSize:17}}>设置</Text>
          <View style={{flex:3,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                {/* <Image source={{uri:'right_ arrows'}} style={{height:17,width:12,marginRight:15}}/> */}
                <CustomIconFont name='right' size={15} color='#CCCCCC' style={{marginRight:15}}/>
              </View>
        </View>
      </TouchableOpacity>
    )
  
  }


  //设置分组列表下的单个cell
  _renderItem =(info)=> {

      return(
        <TouchableOpacity style={{height:52,backgroundColor:'#FFFFFF'}} onPress={this._onPressCallBack.bind(this,info.index)}>
          <View style={{flex:1,alignItems:'center',marginLeft:10,flexDirection:'row'}}>
              {/* <Image source={{uri:info.item.key}} style={{height:25,width:25}}/> */}
              <CustomIconFont name={info.item.key} size={19} color={info.item.color}/>
              <Text style={{marginLeft:20,fontSize:17}}>{info.item.title}</Text>
              <View style={{flex:3,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                {/* <Image source={{uri:'right_ arrows'}} style={{height:17,width:12,marginRight:15}}/> */}
                <CustomIconFont name='right' size={15} color='#CCCCCC' style={{marginRight:15}}/>
              </View>
              
          </View>
        </TouchableOpacity>
      )
    
  }
  extraUniqueKey(item,index){
      return 'index'+index+item;
  }
  render() {

    return (
      <View style={{flex:1,backgroundColor:'#F3F3F3'}}>
          <StatusBar barStyle='light-content'/>
          <SectionList
              //设置分组列表下的每个组头内容
              renderSectionHeader={this._sectionHeaderComponent.bind(this)}
              //设置分组列表下的每个组尾内容
              renderSectionFooter={this._sectionFooterComponent.bind(this)}
              //设置分组列表下的每个cell
              renderItem={this._renderItem}
              //分配数据
              sections={sections}
              keyExtractor={this.extraUniqueKey}
              //设置行与行之间的分隔线组件
              ItemSeparatorComponent={()=><View style={{backgroundColor:'#F3F3F3',height:1,opacity:0.5}}></View>}
              // scrollEnabled={false}
          />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  headerContainer:{
    height:219,
    marginBottom:20,
    backgroundColor:'#5FAED8',
    justifyContent:'center',
    alignItems:'center'
  },
  item:{
    height:52,
    flexDirection:'row',
    alignItems:'center',
  },
  ImageBackground:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  imageHeader:{
    height:64,
    width:64
  },
  userName:{
    fontSize:20,
    color:'white',
    marginTop:10
  }

  
});
