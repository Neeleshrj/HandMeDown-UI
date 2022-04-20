import { getHeaderTitle } from "@react-navigation/elements";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TakeJob from '../screens/TakeJob';
import DetailedJobBox from '../screens/TakeJob/JobBox/DetailedJobBox';
import ListJob from '../screens/ListJob';

import CustomHeader from "./CustomHeader";

const Stack = createNativeStackNavigator();

export default function JobsStackNav(){
    return(
        <Stack.Navigator screenOptions={{
            header: ({ navigation, route, options }) => {
                const title = getHeaderTitle(options, route.name);
                return <CustomHeader title={title} navigation={navigation} />;
              },
        }}>
            <Stack.Screen name="TakeJob" component={TakeJob} options={{
                headerShown: false
            }}/>
            <Stack.Screen name="JobDetails" component={DetailedJobBox} />
            <Stack.Screen name="PostJob" component={ListJob} />
        </Stack.Navigator>
    )
}