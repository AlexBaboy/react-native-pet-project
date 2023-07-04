import React, {useState} from 'react';
import {
    ScrollView,
    Text,
    Button,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    TextInputProps, Pressable, Modal, Alert,
} from 'react-native';
import {Published, RecordState} from "../../store/slices/recordSlice/types";
import {sharedColors} from "../../shared/styles/colors";
import {fontSizes} from "../../shared/styles/fonstSizes";
import {PlusIcon} from "../../shared/components/PlusIcon";

interface ExtendedInputProps extends TextInputProps {
    name: keyof RecordState;
}

const ExtendedTextInput: React.FC<ExtendedInputProps> = (props) => {
    return <TextInput {...props} />;
};

export const AddRecord = () => {

    const [state, setState] = useState({
        title: '',
        description: '',
        published: ''
    })

    const publishedValues = Object.values(Published);

    const [modalVisible, setModalVisible] = useState(false);

    const handleChange = (name: keyof RecordState, value: string) => {
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const addRecord = () => {
        console.log('13 add record clicked!!!')
        console.log('13 publishedValues', publishedValues)
    }

    return (
        <SafeAreaView style={styles.container}>

            <View>
                <ExtendedTextInput
                    placeholder={'Title'}
                    onChangeText={(value) => handleChange('title', value)}
                    value={state.title}
                    name="title"
                    style={styles.inputForm}
                />
                <Pressable
                    onPress={() => setModalVisible(true)}
                >
                    <ExtendedTextInput
                        placeholder={'Published'}
                        value={state.published}
                        name="published"
                        editable={false}
                        style={styles.inputForm}
                    />
                </Pressable>
                <ExtendedTextInput
                    placeholder={'Description'}
                    numberOfLines={4}
                    maxLength={80}
                    onChangeText={(value) => handleChange('description', value)}
                    value={state.description}
                    name="description"
                    style={styles.inputForm}
                />
            </View>

            <View style={styles.photoBlock}>
                <View>
                    <Text style={styles.photoBlockTitle}>Photo</Text>
                </View>
                <View style={styles.plusBlockContainer}>
                    <TouchableOpacity style={styles.plusBlock} >
                        <PlusIcon />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
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
                                        setModalVisible(false);
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

            <ScrollView>
                <Button title={'Add record'} onPress={addRecord}/>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        height: '100%',
        padding: fontSizes['1rem'],
        backgroundColor: sharedColors.white,
        color: sharedColors.black
        //marginTop: StatusBar.currentHeight || 0,
    },
    inputForm: {
        minHeight: 60,
        backgroundColor: sharedColors.bgGray ,
        borderRadius: 4,
        paddingHorizontal: fontSizes['1rem'],
        paddingVertical: 4,
        marginVertical: 4,
        textTransform: "capitalize"
    },
    title: {
        fontSize: fontSizes['1rem'] * 2,
    },

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
    modalText: {
        marginBottom: fontSizes['1rem'],
        textAlign: 'center',
    },
    option: {

    },
    optionText: {

    },
    photoBlock: {
        marginTop: fontSizes['1rem'],
        borderTopWidth: fontSizes['1rem'],
        borderTopColor: sharedColors.bgGray
    },
    photoBlockTitle: {
        marginTop: fontSizes['1rem'],
        color: sharedColors.black,
    },
    plusBlockContainer: {
        marginVertical: fontSizes['1rem'],
        padding: 0
    },
    plusBlock: {
        margin: 0,
        padding: 0,
        width: 100,
        height: 100,
        backgroundColor: sharedColors.bgGray,
        justifyContent: 'center',
        alignItems: 'center'
    }
})