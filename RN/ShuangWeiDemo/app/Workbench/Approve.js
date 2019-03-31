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
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import MySrollTabBar from '../Main/MySrollTabBar';


export default class Approve extends Component{
    constructor(props) {
		super(props);

		this.state = {
			tabNames: ['我审批的', '我发起的', '抄送我的'],
            tabIconNames: ['woshenpide', 'wofaqide', 'chaosongwode'],
            //待我审批
            myApproval:5,
            //我已审批
            myHaveApproval:2,
            //等待审批
            waitApproval:2,
            //已被审批
            haveApproval:2,
            //未读
            unread:1,
            //已读
            read:2
		};
	}

	render() {
		let tabNames = this.state.tabNames;
		let tabIconNames = this.state.tabIconNames;
		return (
			<ScrollableTabView
				renderTabBar={() => <MySrollTabBar tabNames={tabNames} tabIconNames={tabIconNames}/>}
				tabBarPosition='top'>

				<View style={styles.content} tabLabel='key1'>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MyApproval')}}>
                        <View style={styles.viewContainer}>
                            <View style={styles.viewFirst}>
                                <CustomIconFont name={'jihuachulizhong'} size={25} color={'#096DD9'} style={{marginLeft:20}}/>
                                <Text style={styles.text}>
                                    <Text>
                                        待我审批<Text>(<Text style={{color:'#74AEDF'}}>{this.state.myApproval}<Text style={{color:'black'}}>)</Text></Text></Text>
                                    </Text>
                                
                                </Text>
                            </View>
                            <View style={styles.viewSecond}>
                                <CustomIconFont name='right' size={15} color='#CCCCCC' style={{marginRight:15}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
					<TouchableOpacity onPress={()=>{this.props.navigation.navigate('MyHaveApproval')}}>
                        <View style={[styles.viewContainer,{marginTop:10}]}>
                            <View style={styles.viewFirst}>
                                <CustomIconFont name={'jihuachulizhong'} size={25} color={'#096DD9'} style={{marginLeft:20}}/>
                                <Text style={styles.text}>
                                    <Text>
                                        我已审批<Text>(<Text style={{color:'#74AEDF'}}>{this.state.myHaveApproval}<Text style={{color:'black'}}>)</Text></Text></Text>
                                    </Text>
                                
                                </Text>
                            </View>
                            <View style={styles.viewSecond}>
                                <CustomIconFont name='right' size={15} color='#CCCCCC' style={{marginRight:15}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
				</View>

				<View style={styles.content} tabLabel='key2'>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('WaitApproval')}}>
                        <View style={styles.viewContainer}>
                            <View style={styles.viewFirst}>
                                <CustomIconFont name={'jihuachulizhong'} size={25} color={'#096DD9'} style={{marginLeft:20}}/>
                                <Text style={styles.text}>
                                    <Text>
                                        等待审批<Text>(<Text style={{color:'#74AEDF'}}>{this.state.waitApproval}<Text style={{color:'black'}}>)</Text></Text></Text>
                                    </Text>
                                
                                </Text>
                            </View>
                            <View style={styles.viewSecond}>
                                <CustomIconFont name='right' size={15} color='#CCCCCC' style={{marginRight:15}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('HaveApproval')}}>
                        <View style={[styles.viewContainer,{marginTop:10}]}>
                            <View style={styles.viewFirst}>
                                <CustomIconFont name={'jihuachulizhong'} size={25} color={'#096DD9'} style={{marginLeft:20}}/>
                                <Text style={styles.text}>
                                    <Text>
                                        已被审批<Text>(<Text style={{color:'#74AEDF'}}>{this.state.haveApproval}<Text style={{color:'black'}}>)</Text></Text></Text>
                                    </Text>
                                
                                </Text>
                            </View>
                            <View style={styles.viewSecond}>
                                <CustomIconFont name='right' size={15} color='#CCCCCC' style={{marginRight:15}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
				</View>
				<View style={styles.content} tabLabel='key3'>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('UnRead')}}> 
                    <View style={styles.viewContainer}>
                        <View style={styles.viewFirst}>
                            <CustomIconFont name={'jihuachulizhong'} size={25} color={'#096DD9'} style={{marginLeft:20}}/>
                            <Text style={styles.text}>
                                <Text>
                                    未读<Text>(<Text style={{color:'#74AEDF'}}>{this.state.unread}<Text style={{color:'black'}}>)</Text></Text></Text>
                                </Text>
                            
                            </Text>
                        </View>
                        <View style={styles.viewSecond}>
                            <CustomIconFont name='right' size={15} color='#CCCCCC' style={{marginRight:15}}/>
                        </View>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Read')}}>
                    <View style={[styles.viewContainer,{marginTop:10}]}>
                        <View style={styles.viewFirst}>
                            <CustomIconFont name={'jihuachulizhong'} size={25} color={'#096DD9'} style={{marginLeft:20}}/>
                            <Text style={styles.text}>
                                <Text>
                                    已读<Text>(<Text style={{color:'#74AEDF'}}>{this.state.read}<Text style={{color:'black'}}>)</Text></Text></Text>
                                </Text>
                            
                            </Text>
                        </View>
                        <View style={styles.viewSecond}>
                            <CustomIconFont name='right' size={15} color='#CCCCCC' style={{marginRight:15}}/>
                        </View>
                    </View>
                </TouchableOpacity>
                   
				</View>
			</ScrollableTabView>
		);
}
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#F3F3F3',
        flex:1
    },
    viewContainer:{
        margin:10,
        borderRadius:5,
        backgroundColor:'white',
        alignItems:'center',
        flexDirection:'row',
        height:50
    },
    viewFirst:{
        alignItems:'center',
        flexDirection:'row',
        flex:3
    },
    viewSecond:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    text:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        fontSize:16,
        marginLeft:10
    }


});

