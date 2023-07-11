import React, {memo} from 'react';
import {Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {sharedColors} from "../styles/colors";
import {fontSizes} from "../styles/fontSizes";
import {messages} from "../../constants/messages";

type ModalComponentProps = {
    setModalVisible: (visible: boolean) => void,
    text: string,
    confirmCallback: (id?: number) => void,
    cancelCallback: () => void,
    id?: number
}

const ModalPublishedComponent = (props: ModalComponentProps) => {

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
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: sharedColors.white,
        borderTopLeftRadius: fontSizes['1rem'],
        borderTopRightRadius: fontSizes['1rem'],
        padding: fontSizes['1rem'],
        alignItems: 'center',
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
        height: '20%',
    },
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
    optionText: {

    },
    optionCheckedSvg: {

    },
    buttonBlock: {
        width: '100%',
        flexDirection: 'row',
        gap: 10
    },
    button: {
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

export default memo(ModalPublishedComponent);