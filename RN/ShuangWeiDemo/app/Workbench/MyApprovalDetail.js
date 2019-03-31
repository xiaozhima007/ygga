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



export default class MyApprovalDtail extends Component{
    constructor(props){
        super(props);
        this.state={
            Attachment:[
                {title:'文档-设计文件.doc'},
                {title:'文档-质量检查报告.doc'},
                {title:'文档-安全检查报告.doc'},
                {title:'文档-承重墙.doc'},
            ]
        }
    }
    //创建附件列表
    renderText(item, index) {
        return(
            <Text style={[styles.textAttachment,{marginBottom:10}]} key={index}>{item.title}</Text>

        )
    }



    render(){
        return(
           <ScrollView style={styles.flex}>
                <View style={{height:50,backgroundColor:'white',alignItems:'center',flexDirection:'row'}}>
                    <Text style={{marginLeft:15,fontSize:16}}>集控楼施工 > 基础施工</Text>
                </View>
                <View style={{marginTop:10,backgroundColor:'white'}}>
                    <Text style={{fontSize:17,marginLeft:15,marginTop:20}}>{this.props.navigation.state.params.title} <Text style={{fontSize:14,color:'#5A5A5A'}}>     截止<Text style={{color:'black'}}> 2018-12-10<Text style={{color:'#5A5A5A'}}> 完成<Text style={{color:'black'}}> {80+`%`}</Text></Text></Text></Text></Text>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Text style={styles.text}>任务编号:</Text>
                        <Text style={[styles.text,{flex:2}]}>13022</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Text style={styles.text}>任务类型:</Text>
                        <Text style={[styles.text,{flex:2}]}>合同</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Text style={styles.text}>计划开始:</Text>
                        <Text style={[styles.text,{flex:2}]}>2018-10-12 12:00</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Text style={styles.text}>计划完成:</Text>
                        <Text style={[styles.text,{flex:2}]}>2019-10-12 12:00</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Text style={styles.text}>实际开始:</Text>
                        <Text style={[styles.text,{flex:2}]}>2018-11-12 12:00</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Text style={styles.text}>实际完成:</Text>
                        <Text style={[styles.text,{flex:2}]}>2019-11-12 12:00</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Text style={styles.text}>计划工期(天):</Text>
                        <Text style={[styles.text,{flex:2}]}>15</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Text style={styles.text}>尚欠工期(天):</Text>
                        <Text style={[styles.text,{flex:2}]}>7</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Text style={styles.text}>完成时工期(天):</Text>
                        <Text style={[styles.text,{flex:2}]}>22</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Text style={styles.text}>总浮时(天):</Text>
                        <Text style={[styles.text,{flex:2}]}>0</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Text style={styles.text}>交付清单:</Text>
                        <View style={{flex:2}}>
                            {/* 数组遍历创建text*/}
                            {this.state.Attachment.map((item, index) => this.renderText(item, index))}

                        </View>
                    </View>
                </View>
           </ScrollView>
        )
    }
}

const styles=StyleSheet.create({
    flex:{
        flex:1,
        backgroundColor: '#F3F3F3',

    },
    text:{
        flex:1,
        fontSize:16,
        color:'#919191',
        marginLeft:15,
        marginTop:5
    },
    textAttachment:{
        fontSize:16,
        color:'#3176AF',
        marginTop:5
    }
});