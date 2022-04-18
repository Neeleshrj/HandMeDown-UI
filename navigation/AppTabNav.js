import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Dashboard from "../screens/Dashboard";
import ListJob from "../screens/ListJob";
import TakeJob from "../screens/TakeJob";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default function AppTabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabNav,
      }}
      initialRouteName="Dashboard"
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name="home-outline"
                color={focused ? "#fff" : "#e3a3ba"}
                size={heightPercentageToDP(4)}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={TakeJob}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name="briefcase-outline"
                color={focused ? "#fff" : "#e3a3ba"}
                size={heightPercentageToDP(4)}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name="person-outline"
                color={focused ? "#fff" : "#e3a3ba"}
                size={heightPercentageToDP(4)}
              />
            </View>
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabNav: {
    backgroundColor: "#F50057",
    height: heightPercentageToDP(8),
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
});
