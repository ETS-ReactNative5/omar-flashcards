import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import DeckList from "./components/DeckList";
import DeckCreate from "./components/DeckCreate";
import CommonStyles from "./utils/styles/common";
import {gray, pink} from "./utils/styles/colors";
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Inter_900Black, Inter_600SemiBold, Inter_400Regular } from '@expo-google-fonts/inter';
import QuestionCreate from "./components/QuestionCreate";
import DeckView from "./components/DeckView";
import QuizView from "./components/QuizView";
import {Provider} from "react-redux";
import {store} from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {STORAGE_KEY} from "./utils/api";
import {clearLocalNotifications, setLocalNotification} from "./utils/helpers";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator headerMode={'none'}>
            <HomeStack.Screen name="DeckList" component={DeckList} />
            <HomeStack.Screen name="DeckView" component={DeckView} />
            <HomeStack.Screen name="QuestionCreate" component={QuestionCreate} />
            <HomeStack.Screen name="QuizView" component={QuizView} />
        </HomeStack.Navigator>
    );
}
function getBottomBarItemIcon(route, focused) {
    switch (route.name) {
        case "Decks":
            return focused
                ? 'ios-list-circle'
                : 'ios-list-circle-outline';
        case "Add Deck":
            return focused
                ? 'ios-add-circle'
                : 'ios-add-circle-outline';
    }
}

const navigatorOptions = {
    screenOptions: ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={getBottomBarItemIcon(route, focused)} size={size} color={color} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: pink,
        inactiveTintColor: 'gray',
    }
}

export default class App extends React.Component {
    state = {
        loaded: false,
    }

    async loadFonts() {
        await Font.loadAsync({
            Inter_400Regular,
            Inter_600SemiBold,
            Inter_900Black,
        })
        this.setState({ loaded: true });
    }

    componentDidMount() {
        setLocalNotification();
        this.loadFonts().catch((err) => console.error(err));
    }

    render() {
        const { loaded } = this.state;
        if (!loaded) {
            return <AppLoading />;
        }
        return (
            <Provider store={store}>
                <View style={CommonStyles.container}>
                    <NavigationContainer>
                        <Tab.Navigator screenOptions={navigatorOptions.screenOptions} tabBarOptions={navigatorOptions.tabBarOptions}>
                            <Tab.Screen name="Decks" component={HomeStackScreen} />
                            <Tab.Screen name="Add Deck" component={DeckCreate} />
                        </Tab.Navigator>
                    </NavigationContainer>
                    <StatusBar translucent={false} backgroundColor={gray} style="dark" />
                </View>
            </Provider>
        );
    }
}
