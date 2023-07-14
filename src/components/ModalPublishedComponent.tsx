import React, {memo} from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View, ViewStyle
} from "react-native";
import {Published} from "../store/slices/recordSlice/types";
import {sharedColors} from "../shared/styles/colors";
import {CheckedIcon} from "../shared/components/iconComponents/CheckedlIcon";
import {messages} from "../constants/messages";
import {button, buttonText, centeredView, modalView} from "../shared/styles/styles";

type ModalComponentProps = {
    modalVisible: boolean
    setModalVisible: (visible: boolean) => void,
    onChangePublished: (value: string) => void,
    checkedValue: string
}

const publishedValues = Object.values(Published);

export const ModalPublishedComponent = memo((props: ModalComponentProps) => {

    const {
        setModalVisible,
        modalVisible,
        onChangePublished,
        checkedValue
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

                <TouchableWithoutFeedback onPressIn={() => setModalVisible(!modalVisible)}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <View style={styles.optionsBlock}>
                                {publishedValues.map((value, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.option}
                                        onPress={() => {
                                            // Обработка выбора значения
                                            onChangePublished(value)
                                            setModalVisible(!modalVisible);
                                        }}
                                    >
                                        <View style={styles.optionContainer}>
                                            <Text style={styles.optionText}>{value}</Text>
                                            {checkedValue === value && (
                                                <View  style={styles.optionCheckedSvg}>
                                                    <CheckedIcon
                                                        fill={sharedColors.modalOverlayBackground}
                                                        width={'24'}
                                                        height={'24'}
                                                    />
                                                </View>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View  style={styles.buttonBlock}>
                                <Pressable
                                    style={StyleSheet.flatten([styles.button, styles.buttonClose])}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.buttonCloseText}>
                                        {messages.records.titles.close}
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
        ...modalView,
        height: '30%',
    } as ViewStyle,
    optionsBlock: {
        width: '100%'
    },
    buttonBlock: {
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
    button: {
        ...button,
        width: '100%'
    } as ViewStyle,
    buttonClose: {
        backgroundColor: sharedColors.blue,
    },
    buttonCloseText: {
        ...buttonText
    } as ViewStyle
})