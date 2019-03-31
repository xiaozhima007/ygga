import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,Dimensions,Image,StatusBar,TouchableHighlight,Alert,FlatList,TouchableOpacity,TouchableNativeFeedback} from 'react-native';
import Swiper from 'react-native-swiper';   
const {width,height} =Dimensions.get('window');
import CustomIconFont from '../Main/CustomIconFont';
import CountDownReact from '../Main/CountDownReact';

const numColumns = 4;
const isIOS = Platform.OS == 'ios';

const data = {
    first: [
        {key: 'anquan1', title: '安全'},
        {key: 'zhiliang', title: '质量'},
        {key: 'shenpi', title: '审批'},
        {key: 'gongchengjindu', title: '工程进度'},
        {key: 'wenmingshigong', title: '文明施工'},
        {key: 'gongyi', title: '工艺'},
        {key: 'huanbao', title: '环保'},
        {key: 'huiyi', title: '会议'},
    ],
    second: [
        {key: 'xinwen', title: '新闻'},
        {key: 'gonggao', title: '公告'},
        {key: 'feikongfenxi', title: '费用分析'},
        {key: 'peixun', title: '培训'},
        {key: 'rizhi', title: '日志'},
    ],
    
};

export default class Workbench extends Component{
    static navigationOptions={
        header:null
    }
    constructor(props){
        super(props);
        this.state={
            swiperShow:false,
            projectName:'国电双维'
        }
    }
    //轮播图
    renderBanner(){
        if(this.state.swiperShow){
            return(
                <View style={styles.container}>
                    <Swiper
                    height={width*40/75}
                    removeClippedSubviews={false}
                    autoplay={true}
                    paginationStyle={{bottom:10}}
                    dotStyle={{backgroundColor:'white', width: 6, height: 6}}
                    activeDotStyle={{backgroundColor:'rgba(0,0,0,.5)', width: 6, height: 6}}
                >
                    <Image source={{uri:'1.jpg'}} style={styles.wrpaper} />
                    <Image source={{uri:'2.jpg'}} style={styles.wrpaper} />
                    <Image source={{uri:'3.jpg'}} style={styles.wrpaper} />
                    <Image source={{uri:'4.jpg'}} style={styles.wrpaper} />

                </Swiper>
                </View>
                
            )
        }else {
            return (
               <View style={styles.wrapper}>
                  <Image source={{uri:'1.jpg'}} style={styles.wrpaper} />
               </View>
             );
         }
    }
    //设置定时器
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                swiperShow:true,
            });
        },1)
    }
    //切换项目
    changeProject(){
        return(
            <TouchableOpacity onPress={()=>{
                //跳转页面传值同时，写好回调函数callBack，通过回调函数将要传回的值返回并更新到state中
                this.props.navigation.navigate('ProjectList', 
                {projectName:this.state.projectName,
                    callback:((projectName)=>{
                        this.setState({
                            projectName:projectName
                        })
                    }
                )});
            }}>
                <View style={styles.changeProjectBox}>
                    <Text style={{flex:3,fontSize:16,color:'#3176AF',marginLeft:15}}>{this.state.projectName}</Text>
                    <View style={{flex:1,marginLeft:15,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                        <Text style={{fontSize:14,color:'#919191',marginRight:5}}>切换项目</Text>
                        <CustomIconFont name='right' size={15} color='#CCCCCC' style={{marginRight:10}}/>
                    </View>
                </View>
            </TouchableOpacity>
            
        )
    }

    //倒计时 
    remainingTime(){
        return(
            <View style={styles.viewTimeBox}>
                <CustomIconFont name={'xinwen'} size={18} color={'#3176AF'} style={{marginLeft:15,marginTop:10}}/>
                <View style={{flex:2,alignItems:'center'}}>
                    <Text style={{fontSize:18}}>168试运行</Text>
                    <View style={{flexDirection:'row',marginTop:15}}>
                        <Text style={{fontSize:20,color:'#919191'}}>倒计时:</Text>
                        <CountDownReact
                            //date={new Date(parseInt(seckill.endTime))}
                            date="2019-11-28T00:00:00+00:00"
                            days={{plural: '天 ',singular: '天 '}}
                            daysStyle={styles.cardItemTimeRemainTxt}
                        />
                        <Text style={{fontSize:18,marginTop:2.5,marginLeft:10,color:'#919191'}}>小时</Text>
                    </View>
                </View>
            </View>
        )
    }

    //小模块的点击事件
    touchModule=(index,type)=>{
        if(type === 'first'){
            switch (index) {
                case 0:
                    Alert.alert(
                        '',
                         '安全',
                         [
                             {text:'确认',}
                         ]

                    )
                    break;
                case 1:
                    Alert.alert(
                        '',
                         '质量',
                         [
                             {text:'确认',}
                         ]

                    )
                    break;
                case 2:
                    this.props.navigation.navigate('Approve');
                    break;
                case 3:
                    Alert.alert(
                        '',
                         '工程进度',
                         [
                             {text:'确认',}
                         ]

                    )
                    break;
                case 4:
                    Alert.alert(
                        '',
                         '文明施工',
                         [
                             {text:'确认',}
                         ]

                    )
                    break;
                case 5:
                    Alert.alert(
                        '',
                         '工艺',
                         [
                             {text:'确认',}
                         ]

                    )
                    break;
                case 6:
                    Alert.alert(
                        '',
                         '环保',
                         [
                             {text:'确认',}
                         ]

                    )
                    break;
                case 7:
                    Alert.alert(
                        '',
                         '会议',
                         [
                             {text:'确认',}
                         ]

                    )
                    break;
            
                default:
                    break;
            }
        }else{
            switch (index) {
                case 0:
                    Alert.alert(
                        '',
                         '新闻',
                         [
                             {text:'确认',}
                         ]

                    )
                    break;
                case 1:
                    Alert.alert(
                        '',
                         '公告',
                         [
                             {text:'确认',}
                         ]

                    )
                    break;
                case 2:
                    Alert.alert(
                        '',
                         '费用分析',
                         [
                             {text:'确认',}
                         ]

                    )
                    break;
                case 3:
                    Alert.alert(
                        '',
                         '培训',
                         [
                             {text:'确认',}
                         ]

                    )
                    break;
                case 4:
                    Alert.alert(
                        '',
                         '日志',
                         [
                             {text:'确认',}
                         ]

                    )
                    break;
            
                default:
                    break;
            }
        }
    }

    //多屏小模块
    renderTypes(){
        const w=width/4,h=w*.6+20
        const renderSwiperView=(arry,type)=>{
            return(
                <View style={{paddingBottom:10,flex:1,backgroundColor:'#fff',flexDirection:'row',flexWrap:'wrap',marginTop:10}}>
                    {
                        arry.map((item,i)=>{
                            let render=(
                                <View style={{width:w,height:h,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
                                    <CustomIconFont
                                        name={item.key}
                                        size={22}
                                        color={'#3176AF'}
                                    />
                                    <Text style={styles.itemText}>{item.title}</Text>
                   
                                </View>
                            )
                            return(
                                isIOS?(
                                    <TouchableOpacity style={{width: w, height: h}} key={i} onPress={() => {this.touchModule(i,type)}}>{render}</TouchableOpacity>
                                ):(
                                    <TouchableNativeFeedback style={{width: w, height: h}} key={i} onPress={() => {}}>{render}</TouchableNativeFeedback>
                                )
                            )
                        })
                    }
                </View>
            )
        }
        return(
            <Swiper
                height={h*2.4}
                loop={false}
                paginationStyle={{bottom:10}}
                dotStyle={{backgroundColor:'rgba(0,0,0,.2)', width: 6, height: 6}}
                activeDotStyle={{backgroundColor:'rgba(0,0,0,.5)', width: 6, height: 6}}
            >
                {renderSwiperView(data.first,'first')} 
                {renderSwiperView(data.second,'second')}

            </Swiper>
        )
    }


    render(){
        return(
            <ScrollView style={styles.flex}>
                <StatusBar barStyle={'light-content'}/>
                {this.renderBanner()}
                {this.changeProject()}
                {this.remainingTime()}
                {this.renderTypes()}
            </ScrollView>
        );
    }
}

const styles=StyleSheet.create({
    flex:{
        flex:1,
        backgroundColor: '#F3F3F3',
    },
    container:{
        height:width * 40 / 75,
    },
    wrpaper:{
        width:width,
        height:width*40/75,
        backgroundColor: '#F3F3F3',
    },
    paginationStyle:{
        bottom:6
    },
    dotStyle:{
        width:22,
        height:3,
        backgroundColor:'#fff',
        opacity:0.4,
        borderRadius:0
    },
    activeDotStyle:{
        width:22,
        height:3,
        backgroundColor:'#fff',
        borderRadius:0
    },
    changeProjectBox:{
        height:45,
        flexDirection:'row',
        backgroundColor:'white',
        alignItems:'center',
        
    },
    viewTimeBox:{
        height:108,
        marginTop:10,
        width:width,
        backgroundColor:'white',
    },
    cardItemTimeRemainTxt: {
        fontSize: 20,
        color: '#ee394b',
        marginLeft:10
    },
    
});