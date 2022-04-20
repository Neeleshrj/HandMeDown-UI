import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TakeJob from '../screens/TakeJob';
import DetailedJobBox from '../screens/TakeJob/JobBox/DetailedJobBox';
import ListJob from '../screens/ListJob';

const Stack = createNativeStackNavigator();

export default function JobsStackNav(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="TakeJob" component={TakeJob} options={{
                headerShown: false
            }}/>
            <Stack.Screen name="JobDetails" component={DetailedJobBox} />
            <Stack.Screen name="PostJob" component={ListJob} />
        </Stack.Navigator>
    )
}