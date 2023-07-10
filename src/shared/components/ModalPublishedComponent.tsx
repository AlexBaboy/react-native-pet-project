import React, {memo} from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {Published} from "../../store/slices/recordSlice/types";
import {sharedColors} from "../styles/colors";
import {fontSizes} from "../styles/fonstSizes";
import {CheckedIcon} from "./iconComponents/CheckedlIcon";

type ModalComponentProps = {
    modalVisible: boolean
    setModalVisible: (visible: boolean) => void,
    onChangePublished: (value: string) => void,
    checkedValue: string
}

const publishedValues = Object.values(Published);

const ModalPublishedComponent = (props: ModalComponentProps) => {

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

                <TouchableWithoutFeedback onPressIn={()=>setModalVisible(!modalVisible)}>
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
                                                <View  style={styles.optionCheckedSvg} >
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
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.buttonCloseText}>CLOSE</Text>
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
        height: '30%',
    },
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
        borderRadius: 4,
        padding: 10,
        width: '100%'
    },
    buttonOpen: {
        backgroundColor: sharedColors.blue,
    },
    buttonClose: {
        backgroundColor: sharedColors.blue,
    },
    buttonCloseText: {
        color: sharedColors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default memo(ModalPublishedComponent);