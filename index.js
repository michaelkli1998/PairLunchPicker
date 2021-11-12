import 'react-native-gesture-handler';
import {AppRegistry, Text, TextInput, LogBox} from "react-native";
import App from "./App";
import {name as appName} from "./app.json";

AppRegistry.registerComponent("main", () => App);

LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop.']); 
