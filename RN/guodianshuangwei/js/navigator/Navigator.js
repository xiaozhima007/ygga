import {createStackNavigator, createAppContainer} from 'react-navigation';
import NewsDetailPage from '../pages/NewsDetailPage';
import NewsListPage from '../pages/NewsListPage';

const NewsNavigator = createStackNavigator({
    NewsList:{
        screen: NewsListPage,
    },
    NewsDetail:{
        screen: NewsDetailPage,
    }
},{
    initialRouteName: "NewsList"
})

export default createAppContainer(NewsNavigator);
