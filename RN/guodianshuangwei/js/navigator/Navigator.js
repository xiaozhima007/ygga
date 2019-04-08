import {
    createStackNavigator, 
    createMaterialTopTabNavigator, 
    createAppContainer
} from 'react-navigation';
import WorkbenchPage from '../pages/Workbench';
import NewsDetailPage from '../pages/NewsDetailPage';
import NewsListPage from '../pages/NewsListPage';
import NoticePage from '../pages/NoticePage';
import NoticeDetailPage from '../pages/NoticeDetailPage';
import WorksProgressSurveyPage from '../pages/WorksProgressSurveyPage';
import WorksProgressPlanPage from '../pages/WorksProgressPlanPage';
import WorksProgressFeedbackPage from '../pages/WorksProgressFeedbackPage';
import searchBar from '../pages/searchBar';

const WorksProgressTopNavigator = createMaterialTopTabNavigator({
    WorksProgressSurveyPage:{
        screen: WorksProgressSurveyPage,
        navigationOptions:{
            tabBarLabel:"进度概况",
            navigationOptions:{

            }
        }
    },
    WorksProgressPlanPage:{
        screen: WorksProgressPlanPage,
        navigationOptions:{
            tabBarLabel:"计划查询"
        }
    },
    WorksProgressFeedbackPage:{
        screen: WorksProgressFeedbackPage,
        navigationOptions:{
            tabBarLabel:"进度反馈"
        }
    },
},{
    initialRouteName: 'WorksProgressSurveyPage',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
        upperCaseLabel: false,
        showIcon: true,
        indicatorStyle:{
            display:"none"
        },
        tabStyle:{
            height: 76
        },
        style:{
            //backgroundColor: 'white'
        }

    }
});

const RootNavigator = createStackNavigator({
    WorkbenchPage:{
        screen: WorkbenchPage,
        navigationOptions:{
            header: null
        }
    },
    NewsList:{
        screen: NewsListPage,
    },
    NewsDetail:{
        screen: NewsDetailPage,
    },
    NoticePage:{
        screen: NoticePage,
    },
    NoticeDetailPage:{
        screen: NoticeDetailPage,
    },
    WorksProgressTopNavigator:{
        screen: WorksProgressTopNavigator
    },
    searchBar:{
        screen: searchBar
    }
})

export default createAppContainer(RootNavigator);