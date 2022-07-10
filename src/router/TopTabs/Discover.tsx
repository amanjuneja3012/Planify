import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as DiscoverScreens from '../../screens/Discover'
import { camelCaseToTitle, findAndRemoveStr } from '../../lib/utils';

const Tab = createMaterialTopTabNavigator();

function Discover() {
    return (
        <Tab.Navigator>
            {Object.entries(DiscoverScreens).map(([name, Exported]) => {
                return <Tab.Screen key={name} name={camelCaseToTitle((findAndRemoveStr(name, 'Screen')))} component={Exported} />
            })}
        </Tab.Navigator>
    );
}

export default Discover