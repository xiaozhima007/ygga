import React, {Component} from 'react';

export default class NavigatorUtils extends Component{
    static resetToHome(params){
        const {navigation} = params;
        navigation.navigate("Main");
    }

    static backPage(navigation){
        navigation.goBack();
    }

    /**
     * 跳转到指定页面
     * @param params
     * @param page
     */
    static goPage(params,page){
        const navigation = NavigatorUtils.navigation;
        //const navigation = params.navigation;
        if(!navigation){
            console.log("NavigatorUtils.navigation can not be null");
        }

        navigation.navigate(
            page,
            {
                ...params
            }
        )
    }
}