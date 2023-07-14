import React, {memo} from 'react';
import {Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle} from "react-native";
import {sharedColors} from "../shared/styles/colors";
import {centeredView, modalView, buttonBlock, button, buttonText} from "../shared/styles/styles";
import {PlusIcon} from "../shared/components/iconComponents/PlusIcon";
import {PhotoCameraIcon} from "../shared/components/iconComponents/PhotoCameraIcon";
import {messages} from "../constants/messages";

type ModalComponentProps = {
    pickPicture: () => void,
    openCamera: () => void,
    cancelCallback: () => void,
}

export const ModalChooseTypePhotoComponent = memo((props: ModalComponentProps) => {

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
});

const styles = StyleSheet.create({
    centeredView: {
        ...centeredView
    } as ViewStyle,
    modalView: {
        ...modalView
    } as ViewStyle,
    buttonBlock: {
       ...buttonBlock
    } as ViewStyle,
    button: {
        ...button
    } as ViewStyle,
    buttonText: {
        ...buttonText
    } as ViewStyle
})