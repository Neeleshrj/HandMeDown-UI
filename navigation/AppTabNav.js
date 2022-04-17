import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from "../screens/Dashboard";
import ListJob from "../screens/ListJob";
import TakeJob from "../screens/TakeJob";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default function AppTabNav(){
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name="Dashboard" component={Dashboard}/>
            <Tab.Screen name="TakeJob" component={TakeJob} />
            <Tab.Screen name="ListJob" component={ListJob} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}