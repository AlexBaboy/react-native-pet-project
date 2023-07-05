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
    TextInputProps, Pressable, Alert, Image,
} from 'react-native';
import {RecordState} from "../../store/slices/recordSlice/types";
import {sharedColors} from "../../shared/styles/colors";
import {fontSizes} from "../../shared/styles/fonstSizes";
import {PlusIcon} from "../../shared/components/PlusIcon";
import {CancelIcon} from "../../shared/components/CancelIcon";
import ImagePicker from 'react-native-image-crop-picker';
import ModalComponent from "../../shared/components/ModalComponent";

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

    const [uri, setUri] = React.useState(undefined);



    const [modalVisible, setModalVisible] = useState(false);

    const handleChange = (name: keyof RecordState, value: string) => {
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const addRecord = () => {
        console.log('13 add record clicked!!!')
    }

    const pickPicture = () => {

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            mediaType: 'photo',
        }).then(image => {
            // @ts-ignore
            setUri(image.path);
            //props.onChange?.(image);
        }).catch(error => {
            if (error.code === 'E_PICKER_CANCELLED') {
                // Обработка случая, когда выбор изображения был отменен пользователем
                console.log('Выбор изображения отменен');
                Alert.alert('Выбор изображения отмене');
            } else {
                // Обработка других ошибок
                console.log('Ошибка при выборе изображения:', error);
                Alert.alert('Ошибка при выборе изображения:', error);
            }
        });
    };

    const removePicture = () => {
        setUri(undefined)
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
                    <TouchableOpacity style={styles.plusBlock} onPress={pickPicture}>

                        {uri ? (
                            <View style={styles.imagesContainer}>
                                <TouchableOpacity style={styles.removePictureBlock} onPress={removePicture}>
                                    <CancelIcon
                                        width={'24'}
                                        height={'24'}
                                        fill={sharedColors.white}
                                    />
                                </TouchableOpacity>
                                <Image
                                    style={styles.recordImage}
                                    source={{ uri }}
                                />
                            </View>
                        ) :
                            <PlusIcon />
                        }

                    </TouchableOpacity>
                </View>

                {modalVisible && <ModalComponent
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    handleChange={handleChange}
                />}

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
    modalText: {
        marginBottom: fontSizes['1rem'],
        textAlign: 'center',
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
        padding: 0,
    },
    plusBlock: {
        margin: 0,
        padding: 0,
        width: 100,
        height: 100,
        backgroundColor: sharedColors.bgGray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagesContainer: {
        flex: 1,
        position: "relative",
        borderRadius: 4
    },
    removePictureBlock: {
      position: 'absolute',
      right: 20,
      top: 0,
      width: 5,
      height: 5,
      zIndex: 5,
      border: 2,
    },
    recordImage: {
        width: 100,
        height: 100
    }
})