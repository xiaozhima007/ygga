import React, {Component} from 'react'
import {
    RefreshControl, View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableHighlight
} from 'react-native'
import NavigatorUtils from "../navigator/NavigatorUtils";

const URL = 'https://api.github.com/search/repositories?q=Android&sort=stars';

const newData = [{
    "id": "123",
    "created_at": "15:30",
    "name": "产品部",
    "description": "国电电力上半年利润总额增长公告",
    "num": "5人浏览"
}, {
    "id": "31792823",
    "created_at": "2018-12-31 08:30",
    "name": "实施部",
    "description": "关于达州发电公司加强安全管理、加强隐患排查，打好迎峰度夏收官战的公告",
    "num": "5人浏览"

}, {
    "id": "1234",
    "created_at": "15:30",
    "name": "产品部",
    "description": "国电电力上半年利润总额增长公告",
    "num": "5人浏览"
}, {
    "id": "1235",
    "created_at": "15:30",
    "name": "产品部",
    "description": "国电电力上半年利润总额增长公告",
    "num": "5人浏览"
}, {
    "id": "1236",
    "created_at": "15:30",
    "name": "产品部",
    "description": "国电电力上半年利润总额增长公告",
    "num": "5人浏览"
}, {
    "id": "1237",
    "created_at": "15:30",
    "name": "产品部",
    "description": "国电电力上半年利润总额增长公告",
    "num": "5人浏览"
}, {
    "id": "1238",
    "created_at": "15:30",
    "name": "产品部",
    "description": "国电电力上半年利润总额增长公告",
    "num": "5人浏览"
}, {
    "id": "1239",
    "created_at": "15:30",
    "name": "产品部",
    "description": "国电电力上半年利润总额增长公告",
    "num": "5人浏览"
}, {
    "id": "1231",
    "created_at": "15:30",
    "name": "产品部",
    "description": "国电电力上半年利润总额增长公告",
    "num": "5人浏览"
}, {
    "id": "1232",
    "created_at": "15:30",
    "name": "产品部",
    "description": "国电电力上半年利润总额增长公告",
    "num": "5人浏览"
}, {
    "id": "1233",
    "created_at": "15:30",
    "name": "产品部",
    "description": "国电电力上半年利润总额增长公告",
    "num": "5人浏览"
},];


export default class NoticePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            hideLoadMore: true,
            dataArray: [],
            error: false,
            errorInfo: "",
        }
    }

    componentDidMount(){
        this.refreshData();
    }

    refreshData(refresh) {
        if (refresh) {
            this.setState({
                dataArray: [],
                isLoading: true,
                hideLoadMore: true
            });
        }
        setTimeout(() => {
            this.setState({
                dataArray: this.state.dataArray.concat(newData),
                isLoading: false,
                hideLoadMore: true
            })

        }, 2000)
        // fetch(URL).then((response) => response.json())
        //     .then((responseData) => {
        //         const items = responseData.items;
        //
        //         this.setState({
        //             dataArray: this.state.dataArray.concat(items),
        //             isLoading: false,
        //         });
        //     }).catch((error) => {
        //     this.setState({
        //         error: true,
        //         errorInfo: error
        //     })
        // }).done();
    }

    genFootIndicator() {
        return (this.state.hideLoadMore ? null : <View style={{flex: 1}}>
            <ActivityIndicator
                size={'large'}
                animating={true}
            />
            <Text style={{fontSize: 14, color: '#999999', alignSelf: 'center'}}>正在加载更多</Text>
        </View>);

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList //bug:会多次调用onEndReached
                    data={this.state.dataArray}
                    renderItem={(data) => this._renderItem(data)}
                    keyExtractor={this._keyExtractor}
                    ItemSeparatorComponent={this._renderItemSeparatorComponent}
                    refreshControl={
                        <RefreshControl
                            title={'loading'}
                            colors={['red', 'blue', 'orange']}
                            refreshing={this.state.isLoading}
                            onRefresh={() => {
                                this.refreshData(true);
                            }}
                        />
                    }

                    ListFooterComponent={() => this.genFootIndicator()}
                    onEndReached={() => {
                        if (this.canLoadMore) {
                            console.log('-----onEndReached-----');
                            this.refreshData(false);
                            this.canLoadMore = false;
                            this.setState({
                                hideLoadMore: true,
                            })
                        }
                    }}

                    // onEndReachedThreshold={0.5}

                    onMomentumScrollBegin={() => {
                        console.log('-----onMomentumScrollBegin-----');
                        this.canLoadMore = true;
                        this.setState({
                            hideLoadMore: false,
                        })
                    }}
                />
            </View>
        );
    }


    _keyExtractor = (item, index) => item.id;

    _renderItemSeparatorComponent = () => (
        <View style={{height: 1, backgroundColor: '#E5E5E5', marginLeft: 18, marginRight: 18, marginTop: 5}}/>
    );

    _onPressItem (data){
        // Alert.alert(item);
        NavigatorUtils.goPage({
            navigation: this.props.navigation,
            item: data,
        }, "NoticeDetailPage")
    }

    _renderItem(data) {
        return <NoticeListItem
            data={data}
            onSelect={(data) => {
                this._onPressItem(data.item) 
            }}
        />
        // const itemJson = data.item;
        // let displayName = data.index === 0 ? 'flex' : 'none';
        // return <TouchableHighlight
        //     underlayColor='transparent'
        //     onPress={() => this._onPressItem(itemJson)}
        // >
        //     <View style={[styles.itemContainer]}>
        //         <Text style={styles.titleLayout}>{itemJson.description}</Text>
        //
        //         <View style={[styles.row, styles.marTop10]}>
        //             <View style={{flexDirection: 'row'}}>
        //                 <Text style={{
        //                     display: displayName,
        //                     fontSize: 12,
        //                     color: '#E60C0C',
        //                     marginRight: 10,
        //                 }}>[置顶]</Text>
        //                 <Text style={[styles.contentLayout]}>{itemJson.name}</Text>
        //                 <Text style={[styles.contentLayout, styles.marL10]}>{itemJson.created_at}</Text>
        //             </View>
        //
        //             <View>
        //                 <Text style={[styles.contentLayout]}>{itemJson.num}</Text>
        //             </View>
        //
        //         </View>
        //     </View>
        // </TouchableHighlight>
    }
}

class NoticeListItem extends Component {
    render() {
        const {data} = this.props;
        const itemJson = data.item;
        let displayName = data.index === 0 ? 'flex' : 'none';

        return <TouchableHighlight
            underlayColor='transparent'
            onPress={this.props.onSelect}
        >
            <View style={[styles.itemContainer]}>
                <Text style={styles.titleLayout}>{itemJson.description}</Text>

                <View style={[styles.row, styles.marTop10]}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{
                            display: displayName,
                            fontSize: 12,
                            color: '#E60C0C',
                            marginRight: 10,
                        }}>[置顶]</Text>
                        <Text style={[styles.contentLayout]}>{itemJson.name}</Text>
                        <Text style={[styles.contentLayout, styles.marL10]}>{itemJson.created_at}</Text>
                    </View>

                    <View>
                        <Text style={[styles.contentLayout]}>{itemJson.num}</Text>
                    </View>

                </View>
            </View>
        </TouchableHighlight>
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        paddingLeft: 18,
        paddingTop: 12,
        paddingRight: 18,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    width30: {
        width: 80
    },

    titleLayout: {
        fontSize: 16,
        color: '#333333',
    },
    contentLayout: {
        fontSize: 14,
        color: '#999999',
    },
    marR10: {
        right: 0
    },
    marL10: {
        marginLeft: 10
    },
    marTop10: {
        marginTop: 10
    },
    padRight10: {
        paddingRight: 10
    },
    redFont: {
        color: '#E60C0C',
        fontSize: 12,
        alignSelf: 'center',
    },
    start: {
        alignSelf: 'flex-start'
    },
    end: {
        alignSelf: 'flex-end'
    }
});

