import React, {Component} from 'react';

import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from 'react-native';
import CustomIconFont from '../Main/CustomIconFont';
import Icon from 'react-native-vector-icons/Ionicons';

class MyScrollTabBar extends Component {


	setAnimationValue({value}) {
		console.log(value);
	}

	componentDidMount() {
		// Animated.Value监听范围 [0, tab数量-1]
		this.props.scrollValue.addListener(this.setAnimationValue);
	}

	renderTabOption(tab, i) {
		let color = this.props.activeTab == i ? "#74AEDF" : "#ADADAD"; // 判断i是否是当前选中的tab，设置不同的颜色
		return (
			<TouchableOpacity onPress={()=>this.props.goToPage(i)} style={styles.tab} key={i}>
				<View style={styles.tabItem}>
					<CustomIconFont
						name={this.props.tabIconNames[i]} // 图标
						size={25}
						color={color}/>
					<Text style={{color: color}}>
						{this.props.tabNames[i]}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={styles.tabs}>
				{this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	tabs: {
		flexDirection: 'row',
        height: 60
	},

	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent:'center'
	},

	tabItem: {
		flexDirection: 'column',
		alignItems: 'center',
	},
});


export default MyScrollTabBar;