/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {_checkRefeshToken} from './src/Redux/Action/index'
_checkRefeshToken()
 
AppRegistry.registerComponent(appName, () => App);
