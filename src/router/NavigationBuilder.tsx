import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Discover from './TopTabs/Discover';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Tab.Screen name="Discover" component={Discover} />
            {/* <Tab.Screen name="DashboardScreen" component={DashboardScreen} /> */}
        </Tab.Navigator>
    );
}

export default function NavigationBuilder() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}