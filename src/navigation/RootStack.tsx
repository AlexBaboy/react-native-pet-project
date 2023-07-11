import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC} from "react";
import {Routes} from "./routes";
import {Pages} from "./routes/pages";

type PagesScreens = typeof Pages.screens;
type PagesScreenKeys = keyof PagesScreens;
type PagesScreenValues = PagesScreens[PagesScreenKeys];

export type RootStackParamList = {
    [Key in PagesScreenValues]: undefined;
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