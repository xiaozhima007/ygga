import React, {Component} from 'react';
import {
    Platform, 
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    Dimensions,
    Image,
    StatusBar,
    TouchableHighlight,
    Alert,FlatList,
    TouchableOpacity,
    TouchableNativeFeedback,
    TextInput
} from 'react-native';
const {width,height}=Dimensions.get('window');

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import moment from 'moment'; 


const data=[
    {title:'打地基',createBy:'张三',type:'计划编制',createDate:1411641720000},
    {title:'国电双维一期支出合同变更',createBy:'李四',type:'合同变更',createDate:1441671720000},
    {title:'北京房山一期支付',createBy:'王五',type:'合同支付',createDate:1531641720000},
    {title:'五期质保金',createBy:'唐鹤德',type:'合同结算',createDate:1561661720000},
    {title:'高松福国华电力在印尼企业来华管理生死书',createBy:'郭凤婷',type:'新闻管理',createDate:1481641720000},
]

export default class MyApproval extends Component{
    constructor(props){
        super(props);
        this.state={
            query:'',
            loaded:false,
        }
    }
    //数据请求
    fetchData(){
       

    }



    renderItem=({item,index})=>{
        const time=moment(item.createDate).format('MM月DD日 HH:mm');
        return(
            <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('MyApprovalDetail',{'title':item.title})
            }}>

                <View style={styles.viewItem}>
                    <View style={styles.viewContainer}>
                        <View style={{flex:3,flexDirection:'row',alignItems:'center'}}>
                                <View style={styles.viewHeader}>
                                    <Text style={{fontSize:12,color:'white'}}>{item.createBy}</Text>
                                </View>
                                <Text style={{fontSize:16,marginLeft:10,marginRight:10}}>{item.title}</Text>
                        </View>
                        <View style={styles.viewType}>
                                <Text style={{fontSize:14,color:'#3176AF'}}>{item.type}</Text>
                        </View>
                    </View>
                    <View style={styles.viewSecond}>
                        <Text style={{fontSize:14,color:'#919191',flex:1}}>{time}</Text>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                            <TouchableOpacity>
                                <View style={{borderColor:'#3176AF',borderRadius:2,marginRight:10,width:52,height:27,borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'#3176AF',fontSize:14}}>拒绝</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{backgroundColor:'#3176AF',borderRadius:2,marginRight:10,width:52,height:27,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'white',fontSize:14}}>同意</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
            </TouchableOpacity>
        )
    }

    extraUniqueKey(item, index) {
        return "index" + index + item;
    }

    render(){
        return(
            <View style={styles.flex}>
                <KeyboardAwareScrollView>
                    <View style={{height:50,backgroundColor:'white',justifyContent:'center'}}>
                        <View style={styles.searchBox}>
                            <EvilIcons name='search' size={20} color={'#B2B2B2'} style={{marginLeft:10}}/>
                            <TextInput
                                style={styles.inputText}
                                autoCapitalize='none'  //设置首字母不自动大写
                                underlineColorAndroid={"transparent"}  //下划线颜色设置为透明
                                placeholderTextColor={'#aaa'}  //设置占位符颜色
                                placeholder={"搜索审批项"}
                                clearButtonMode={'while-editing'}
                                returnKeyType="search"
                                onChangeText={(query) =>{
                                    this.setState({
                                        query:query,
                                        loaded:false,
                            
                                    });// 当内容改变时执行该方法
                                }}
                                onSubmitEditing={this.fetchData.bind(this)}
                            />

                        </View>
                    </View>
                    <View style={styles.listViewBox}>
                        <FlatList
                            data={data}
                            keyExtractor={this.extraUniqueKey}
                            renderItem={this.renderItem}
                            //设置行与行之间的分隔线组件
                            ItemSeparatorComponent={()=><View style={{backgroundColor:'#F3F3F3',height:1,opacity:0.5}}></View>}

                        />
                     </View>
                </KeyboardAwareScrollView>
                
                
                
            </View>
        )
    }
}
const styles=StyleSheet.create({
    flex:{
        flex:1,
        backgroundColor: '#F3F3F3',
    },
    searchBox: {
		height: 35,
		marginLeft: 15,
		marginRight: 15,
		flexDirection: 'row',
		backgroundColor: '#E6E7E8',
        borderRadius:5,
        alignItems:'center'
	},
	searchIcon: {
		alignSelf:'center',
		marginLeft:7,
		marginRight:7,
		width:18,
		height:18,
	},
	inputText: {
		alignSelf:'center',
		marginTop:0,
		flex:1,
		height:30,
		marginLeft: 5,
		marginRight: 5,
		fontSize: 16,
		lineHeight: 30,
		textAlignVertical: 'center',
		textDecorationLine: 'none'
    },
    listViewBox:{
        marginTop:10,
        backgroundColor:'#F3F3F3'
    },
    viewContainer:{
        flex:5,
        flexDirection:'row',
        margin:10,
        marginTop:10
    },
    viewItem:{
        height:120,
        margin:5,
        backgroundColor:'white'
    },
    viewHeader:{
        width:44,
        height:44,
        borderRadius:22,
        backgroundColor:'#3176AF',
        justifyContent:'center',
        alignItems:'center'
    },
    viewType:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        flexDirection:'row',
        marginRight:2
    },
    viewSecond:{
        height:35,
        marginLeft:10,
        marginBottom:5,
        flexDirection:'row',
        alignItems:'center',
        flex:5,
        justifyContent:'space-around'
    }


});