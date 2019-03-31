
import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';



export default class WorkbenchPage extends Component {
  render() {
      const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>工作台</Text>
        <View style = {styles.buttons}>
          <Button
            title = "新闻模块"
            onPress = {()=>navigation.navigate('NewsList')}
          />
          <Button
            title = "公告模块"
            onPress = {()=>navigation.navigate('NoticePage')}
          />
          <Button
            title = "工程进度"
            onPress = {()=>navigation.navigate('WorksProgressTopNavigator')}
          />
        </View>
        

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
