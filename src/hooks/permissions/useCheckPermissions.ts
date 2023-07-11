import {PermissionsAndroid} from "react-native";
import {useEffect} from "react";

export const useCheckPermissions = () => {

    useEffect(() => {
        requestReadFiles()
        requestCamera()
    }, []);

    const requestReadFiles = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    buttonNegative: undefined, buttonNeutral: undefined, buttonPositive: "",
                    title: 'App READ_EXTERNAL_STORAGE',
                    message: 'App needs access to your READ_EXTERNAL_STORAGE'
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can READ_EXTERNAL_STORAGE');
            } else {
                console.log('READ_EXTERNAL_STORAGE permission denied');
            }
        } catch (e) {
            console.log("requestReadFiles", e);
        }
    };

    const requestCamera = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    buttonNegative: undefined, buttonNeutral: undefined, buttonPositive: "",
                    title: 'App use CAMERA',
                    message: 'CAMERA App needs access to your CAMERA'
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use CAMERA');
            } else {
                console.log('CAMERA permission denied');
            }
        } catch (e) {
            console.log("requestCamera", e);
        }
    };
}