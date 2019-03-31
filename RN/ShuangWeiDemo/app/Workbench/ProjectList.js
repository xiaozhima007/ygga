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

import CustomIconFont from '../Main/CustomIconFont';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const data=[
    {projectName:'国电双维',projectId:'1',status:'在建',color:'#3176AF'},
    {projectName:'华润二期',projectId:'2',status:'在建',color:'#3176AF'},
    {projectName:'北京房山',projectId:'3',status:'待建',color:'#D48806'},
    {projectName:'豫能菲达',projectId:'4',status:'待建',color:'#D48806'},
    {projectName:'沿海一期火力发电厂项目',projectId:'4',status:'已竣工',color:'#25AB38'}
]

export default class ProjectList extends Component{
    constructor(props){
        super(props);
        this.state={
            query:'',
            loaded:false,
        }
    }
    fetchData(){
        var dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();

        Alert.alert(
            '',
            this.state.query,
            [
                {text:'确认',}
            ]
        )

    }


    renderItem=({item,index})=>{
        const  projectName=this.props.navigation.state.params.projectName;
        return(
            <TouchableOpacity onPress={()=>{
                if(this.props.navigation.state.params.callback){
                    this.props.navigation.state.params.callback(item.projectName)
                    this.props.navigation.goBack()
                }
            }}>
                <View style={{height:52,width:width,backgroundColor:'white',alignItems:'center',flexDirection:'row'}}>
                    <View style={{flex:8,flexDirection:'row',alignItems:'center'}}>
                        <Text style={{marginLeft:20,fontSize:16}}>{item.projectName}</Text>
                        <View style={{marginLeft:10,borderColor:item.color,width:48,height:22,borderWidth:1,justifyContent:'center',alignItems:'center',borderRadius:2}}>
                            <Text style={{fontSize:12,color:item.color}}>{item.status}</Text>
                        </View>
                    </View>
                  
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                        {projectName===item.projectName ? <CustomIconFont name={'test_right'} size={22} color={'#3176AF'} style={{marginRight:10}}/> : null}
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
                                placeholder={"搜索项目"}
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
    }


});