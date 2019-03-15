
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
const fontChange = 1.0;
export default class NewsDetailPage extends Component {
  static navigationOptions = {
    title: "新闻详情"
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
         <View style={styles.content}>
          <NewsTitle />
            <Image
              style = {styles.imageStyle}
              source = {require('../img/gsfgh.jpg')}
              borderRadius = {3}
            />
          <NewsText />
          <View style = {styles.accessoryView}>
            <Text style = {styles.accessory}>附件</Text>
            <Text style = {styles.accessoryFile}>文档-质量检查报告.doc</Text>
          </View>
         </View>
        </ScrollView>
        
      </View>
    );
  }
}

// 标题组件
class NewsTitle extends Component {
  render () {
    const title = '高嵩赴国华电力在印尼企业进行调研';
    const department = "产品部";
    const releaseTime = '14:00';
    const readNum = '5';   
    return (
      <View style = {styles.headerContainer}>
        <Text style = {styles.headerTitle}>{title}</Text>
        <View style = {styles.headerSatellite}>
          <Text style = {styles.headerSatelliteText}>
            {department}
          </Text>
          <Text style = {styles.headerSatelliteText}>
            {releaseTime}            
          </Text>
          <Text style = {styles.headerSatelliteText}>
            {readNum}人浏览
          </Text>
          
        </View>
      </View>
    )
  }
}

//内容-文字组件
class NewsText extends Component {
  render () {
    const content = '8月21日至25日，国家能源集团党组成员、副总经理高嵩率团赴国华电力在印尼企业调研。在雅加达期间，高嵩与印尼投资协调管委会（BKPM）副主席鲁比斯就加强合作、共同推进相关项目进行了友好交谈，与中国驻印尼大使馆经商参处公使衔参赞王立平就加强沟通协作、促进企业在印尼更好发展等事宜进行了深入交流。 调研期间，高嵩分别深入爪哇7号项目建设现场、煤码头，南苏1号项目现场，南苏穆印露天矿、电厂锅炉零米、汽机房、褐煤干燥车间、主控室等生产现场，详细了解机组运行、企业经营管理、项目基本建设、前期工作推进及施工准备等情况，慰问中、印生产、基建一线干部员工。在听取有关情况汇报后，他指出，国华电力在印尼深耕十年，取得了骄人的业绩，为国家争了光，为中国电力人立了碑，为国华电力树立了品牌，展现了良好的中国央企形象，成绩值得充分肯定。 就下一步工作，高嵩要求，一要深入学习领会习近平总书记关于“一带一路”倡议的重要论述和指示精神，更加自觉地服务国家战略，自觉成为实施国家“走出去”战略、“一带一路”建设等重大战略的重要力量。加强驻印尼机构、人员的配置，利用国华电力在印尼的品牌价值，将印尼作为开展国际化业务的桥头堡，以发电、配网业务为重点，加强市场、政策研究，积极寻求符合国家战略、风险可控、效益可观的优质项目，将业务辐射到周边东南亚国家';
    return (
      <View>
        <Text style = {styles.contentText}>{content}</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  content:{
    paddingHorizontal: 23
  },
  headerContainer:{
    paddingVertical: 18,
    paddingLeft: 12
  },
  headerTitle:{
    fontSize: 18*fontChange,
    color: '#333',
    fontWeight: 'bold',
  },
  headerSatellite:{
    flexDirection:'row',
    marginTop: 7,
    paddingLeft: 3
  },
  headerSatelliteText:{
    fontSize: 14*fontChange,
    color: '#989898',
    marginRight: 18
  },
  imageStyle:{
    width:'100%',
    height: 139,
    marginBottom: 20
  },
  contentText:{
    fontSize: 16*fontChange,
    color: '#333'
  },
  accessoryView:{
    marginTop: 16
  },
  accessory:{
    fontSize: 16*fontChange,
    color: '#989898',
    marginBottom: 6
  },
  accessoryFile:{
    fontSize: 16*fontChange,
    color: '#3176AF'
  }
});
