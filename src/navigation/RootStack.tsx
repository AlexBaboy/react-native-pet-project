import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC} from "react";
import {Routes} from "./routes";

export type RootStackParamList = {
    RecordList: undefined;
    AddRecord: undefined;
}

const Stack = createNativeStackNavigator();
export type RootStackType = NativeStackNavigationProp<RootStackParamList>;

export const RootStack: FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    Routes.map((route) => (
                        <Stack.Screen
                            name={route.name}
                            component={route.component}
                            key={route.id}
                        />
                    ))
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}