import React, {memo} from 'react';
import {Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle} from "react-native";
import {sharedColors} from "../shared/styles/colors";
import {messages} from "../constants/messages";
import {button, buttonBlock, buttonText, centeredView, modalView} from "../shared/styles/styles";

type ModalComponentProps = {
    setModalVisible: (visible: boolean) => void,
    text: string,
    confirmCallback: (id?: number) => void,
    cancelCallback: () => void,
    id?: number
}

export const ModalDeleteComponent = memo((props: ModalComponentProps) => {

    const {
        setModalVisible,
        text,
        confirmCallback,
        cancelCallback,
        id,
    } = props

    return (
        <View style={styles.centeredView}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>

                <TouchableWithoutFeedback onPressIn={cancelCallback}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <View style={styles.optionsBlock}>
                                <Text>
                                    {text}
                                </Text>
                            </View>

                            <View style={styles.buttonBlock}>
                                <Pressable
                                    style={styles.button}
                                    onPress={() => confirmCallback(id)}>
                                        <Text style={styles.buttonText}>
                                            {messages.records.titles.yes}
                                        </Text>
                                </Pressable>
                                <Pressable
                                    style={styles.button}
                                    onPress={cancelCallback}>
                                        <Text style={styles.buttonText}>
                                            {messages.records.titles.no}
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
    optionsBlock: {
        width: '100%'
    },
    optionContainer: {
        margin: 0,
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    option: {
        marginTop: 8,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: sharedColors.bgGray
    },
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