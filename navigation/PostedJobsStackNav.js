import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostedJobs from '../screens/PostedJobs';

const Stack = createNativeStackNavigator();

export default function PostedJobsStackNav(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="PostedJobs" component={PostedJobs} options={{
                headerShown: false
            }}/>
        </Stack.Navigator>
    )
}