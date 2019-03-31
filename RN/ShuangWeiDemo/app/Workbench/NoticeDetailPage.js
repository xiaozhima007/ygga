import React, {Component} from 'react'
import {ScrollView, View, Text, Alert, StyleSheet} from 'react-native'

export default class NoticeDetailPage extends Component {
    render(){

        const {navigation} = this.props;
        const item = navigation.getParam('item', 'NO-ID');

        // const index = navigation.getParam('index', 0);
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={[styles.color_1,styles.font18]}>
                        国电电力上半年利润总额增长公告
                    </Text>

                    <View style={[styles.row, styles.marTop10]}>
                        <Text style={[styles.color_2,styles.font14]}>
                            {item.full_name}
                        </Text>

                        <Text style={[styles.contentLayout, styles.marL10]}>
                            15:30
                        </Text>

                        <Text style={[styles.contentLayout, styles.marL10]}>
                            {`${index}人浏览`}
                        </Text>
                    </View>

                    <Text style={[styles.color_1,styles.font16,styles.marTop25]}>
                        8月31日，国电电力发布2018年半年度报告。报告显示，上半年，该公司营业收入311.79亿元，同比增长8.47%；归属于上市公司股东的净利润同比增长6.02%；利润总额31.88亿元，同比增长14%
                    </Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10
    },
    row: {
        flexDirection: 'row',
    },
    color_1:{
        color:'#333333'
    },
    color_2:{
        color: '#989898',
    },
    font14:{
        fontSize: 14,
    },
    font16:{
        fontSize:16
    },
    font18:{
        fontSize:18
    },
    marL10: {
        marginLeft: 18
    },
    marTop10: {
        marginTop: 15
    },
    marTop25: {
        marginTop: 25
    },

});
