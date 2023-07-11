import React, {memo} from 'react';
import {Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {sharedColors} from "../styles/colors";
import {fontSizes} from "../styles/fontSizes";
import {PlusIcon} from "./iconComponents/PlusIcon";
import {PhotoCameraIcon} from "./iconComponents/PhotoCameraIcon";
import {messages} from "../../constants/messages";

type ModalComponentProps = {
    pickPicture: () => void,
    openCamera: () => void,
    cancelCallback: () => void,
}

const ModalChooseTypePhotoComponent = (props: ModalComponentProps) => {

    const {
        pickPicture,
        openCamera,
        cancelCallback,
    } = props

    return (
        <View style={styles.centeredView}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    cancelCallback();
                }}>

                <TouchableWithoutFeedback onPressIn={cancelCallback}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <View style={styles.buttonBlock}>
                                <Pressable
                                    style={styles.button}
                                    onPress={pickPicture}>
                                    <PlusIcon
                                        fill={sharedColors.white}
                                    />
                                    <Text style={styles.buttonText}>
                                        {messages.records.text.file}
                                    </Text>
                                </Pressable>

                                <Pressable
                                    style={styles.button}
                                    onPress={openCamera}>
                                    <PhotoCameraIcon
                                        fill={sharedColors.white}
                                    />
                                    <Text style={styles.buttonText}>
                                        {messages.records.text.camera}
                                    </Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>

                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    modalView: {
        backgroundColor: sharedColors.white,
        borderTopLeftRadius: fontSizes['1rem'],
        borderTopRightRadius: fontSizes['1rem'],
        padding: fontSizes['1rem'],
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: '20%'
    },
    buttonBlock: {
        width: '100%',
        flexDirection: 'row',
        gap: 10
    },
    button: {
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: '50%',
        backgroundColor: sharedColors.blue
    },
    buttonText: {
        color: sharedColors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default memo(ModalChooseTypePhotoComponent);