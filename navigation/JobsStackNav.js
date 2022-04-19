import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TakeJob from '../screens/TakeJob';
import DetailedJobBox from '../screens/TakeJob/JobBox/DetailedJobBox';

const Stack = createNativeStackNavigator();

export default function JobsStackNav(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="TakeJob" component={TakeJob} options={{
                headerShown: false
            }}/>
            <Stack.Screen name="JobDetails" component={DetailedJobBox} />
        </Stack.Navigator>
    )
}