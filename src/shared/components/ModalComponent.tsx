import React, {memo} from 'react';
import {Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Published, RecordState} from "../../store/slices/recordSlice/types";
import {sharedColors} from "../styles/colors";
import {fontSizes} from "../styles/fonstSizes";

type ModalComponentProps = {
    modalVisible: boolean
    setModalVisible: (visible: boolean) => void,
    handleChange: (name: keyof RecordState, value: string) => void,
}

const publishedValues = Object.values(Published);

const ModalComponent = (props: ModalComponentProps) => {

    const {
        setModalVisible,
        handleChange,
        modalVisible
    } = props

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(false);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        {publishedValues.map((value, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.option}
                                onPress={() => {
                                    // Обработка выбора значения
                                    console.log(value);
                                    handleChange('published', value)
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.optionText}>{value}</Text>
                            </TouchableOpacity>
                        ))}

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: sharedColors.white,
        borderTopLeftRadius: fontSizes['1rem'],
        borderTopRightRadius: fontSizes['1rem'],
        padding: fontSizes['1rem'] * 2,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: '50%'
    },
    option: {

    },
    optionText: {

    },
    button: {
        borderRadius: fontSizes['1rem'],
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

export default memo(ModalComponent);