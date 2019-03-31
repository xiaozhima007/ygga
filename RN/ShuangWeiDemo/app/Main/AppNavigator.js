import React from 'react';
import { Text, View,Image } from 'react-native';

import {createStackNavigator,createAppContainer,createBottomTabNavigator,createSwitchNavigator} from 'react-navigation';
import Mine from '../Mine/Mine';    
import MineDetail from '../Mine/MineDetail';
import UpdatePassword from '../Mine/UpdatePassword';
import Setting from '../Mine/Setting';
import AddressList from '../AddressList/AddressList';
import Message from '../Message/Message';
import Workbench from '../Workbench/Workbench';
import CustomIconFont from '../Main/CustomIconFont';
import ProjectList from '../Workbench/ProjectList';
import Approve from '../Workbench/Approve';
import MyApproval from '../Workbench/MyApproval';
import MyHaveApproval from '../Workbench/MyHaveApproval';
import WaitApproval from '../Workbench/WaitApproval';
import HaveApproval from '../Workbench/HaveApproval';
import UnRead from '../Workbench/UnRead';
import Read from '../Workbench/Read';
import MyApprovalDetail from '../Workbench/MyApprovalDetail';
const MineStck=createStackNavigator({
    Mine:{
        screen:Mine,
        navigationOptions:{
            title:'我的',
            header:null
        }
    },
    MineDetail:{
        screen:MineDetail, 
        navigationOptions:{
            headerTitle:'个人资料'
        }
    },
    UpdatePassword:{
        screen:UpdatePassword,
        navigationOptions:{
            headerTitle:'修改密码'
        }
    },
    Setting:{
        screen:Setting,
        navigationOptions:{
            headerTitle:'设置'
        }
    }
},{
    defaultNavigationOptions:{
        //设置导航栏背景颜色
        headerStyle:{
            backgroundColor:'#5FAED8'
        },
        //设置导航栏字体颜色
        headerTintColor:'white',
        //去掉导航栏返回按钮的字体
        headerBackTitle:null,
        gesturesEnabled:false
    }
})

MineStck.navigationOptions=({navigation})=>{
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
}

const AddressListStack=createStackNavigator({
    AddressList:{
        screen:AddressList,
        navigationOptions:{
            title:'通讯录'
        }
    }
},{
    defaultNavigationOptions:{
        //设置导航栏背景颜色
        headerStyle:{
           backgroundColor:'#5FAED8'
       },
       //设置导航栏字体颜色
       headerTintColor:'white',
       //去掉导航栏返回按钮的字体
       headerBackTitle:null,
       gesturesEnabled:false
   }
})

AddressListStack.navigationOptions=({navigation})=>{
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
}

const WorkbenchStack=createStackNavigator({
    Workbench:{
        screen:Workbench,
        navigationOptions:{
            title:'工作台'
        }
    },
    ProjectList:{
        screen:ProjectList,
        navigationOptions:{
            title:'项目列表'
        }
    },
    Approve:{
        screen:Approve,
        navigationOptions:{
            title:'审批'
        }

    },
    MyApproval:{
        screen:MyApproval,
        navigationOptions:{
            title:'待我审批',
        }
    },
    MyHaveApproval:{
        screen:MyHaveApproval,
        navigationOptions:{
            title:'我已审批',
        }
    },
    WaitApproval:{
        screen:WaitApproval,
        navigationOptions:{
            title:'等待审批',
        }
    },
    HaveApproval:{
        screen:HaveApproval,
        navigationOptions:{
            title:'已被审批',
        }
    },
    UnRead:{
        screen:UnRead,
        navigationOptions:{
            title:'未读',
        }
    },
    Read:{
        screen:Read,
        navigationOptions:{
            title:'已读',
        }
    },
    MyApprovalDetail:{
        screen:MyApprovalDetail,
        navigationOptions:{
            title:'审批详情'
        }

    }
},{
    defaultNavigationOptions:{
        //设置导航栏背景颜色
        headerStyle:{
           backgroundColor:'#5FAED8'
       },
       //去掉导航栏返回按钮的字体
       headerBackTitle:null,
       //设置导航栏字体颜色
       headerTintColor:'white',
       gesturesEnabled:false
   }
})

WorkbenchStack.navigationOptions=({navigation})=>{
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
}

const MessageStack=createStackNavigator({
    Message:{
        screen:Message,
        navigationOptions:{
            title:'消息'
        }
    }
},{
    defaultNavigationOptions:{
        //设置导航栏背景颜色
        headerStyle:{
           backgroundColor:'#5FAED8'
       },
       //设置导航栏字体颜色
       headerTintColor:'white',
       //去掉导航栏返回按钮的字体
       headerBackTitle:null,
       gesturesEnabled:false
   }
})

MessageStack.navigationOptions=({navigation})=>{
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
}

const AppBottom=createBottomTabNavigator({
    MessageStack:{
        screen:MessageStack,
        navigationOptions:{
            tabBarLabel:'消息',
            tabBarIcon:({tintColor,focused})=>(
                <CustomIconFont
                    name={'xiaoxi'}
                    size={22}
                    style={{color:tintColor}}
                />
            )
        }
    },
    WorkbenchStack:{
        screen:WorkbenchStack,
        navigationOptions:{
            tabBarLabel:'工作台',
            tabBarIcon:({tintColor,focused})=>(
                <CustomIconFont
                    name={'webicon01'}
                    size={22}
                    style={{color:tintColor}}
                />
            )
        }
    },
    AddressListStack:{
        screen:AddressListStack,
        navigationOptions:{
            tabBarLabel:'通讯录',
            tabBarIcon:({tintColor,focused})=>(
                <CustomIconFont
                    name={'tongxunlu'}
                    size={22}
                    style={{color:tintColor}}
                />
            )
        }
    },
    MineStck:{
        screen:MineStck,
        navigationOptions:{
            tabBarLabel:'我的',
            tabBarIcon:({tintColor,focused})=>(
                <CustomIconFont
                    name={'sousuo'}
                    size={22}
                    style={{color:tintColor}}
                />
            )
        }
    }
},{
    tabBarOptions:{
        activeTintColor:'#3176AF'
    },
    

})


export default createAppContainer(AppBottom);