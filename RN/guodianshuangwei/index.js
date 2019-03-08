/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import news from './js/pages/NewsDetailPage';
import Navigator from './js/navigator/Navigator';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Navigator);
