import React, {useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    Button,
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    TextInputProps, Pressable, Alert,
} from 'react-native';
import {RecordState} from "../../store/slices/recordSlice/types";
import {sharedColors} from "../../shared/styles/colors";
import {fontSizes} from "../../shared/styles/fonstSizes";
import ImagePicker from 'react-native-image-crop-picker';
import ModalComponent from "../../shared/components/ModalComponent";
import ImageCropComponent from "../ImageCropComponent";
import { useForm, Controller } from "react-hook-form"
import {messagesEnum} from "../../constants/messages";

interface ExtendedInputProps extends TextInputProps {
    name: keyof RecordState;
}

type FormData = {
    title: string;
    description: string;
    published: string;
    photoUrl: string
};

const ExtendedTextInput: React.FC<ExtendedInputProps> = (props) => {
    return <TextInput {...props} />;
};

export const AddRecord = () => {

    const [photoUrl, setPhotoUrl] = React.useState('');

    const [modalVisible, setModalVisible] = useState(false);

    /*const handleChange = async (name: keyof RecordState, value: string) => {

        //await trigger([name as keyof FormData]).then(r => r); // Вызываем валидацию для поля при его изменении

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };*/

    const pickPicture = () => {

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            mediaType: 'photo',
        }).then(image => {
            setPhotoUrl(image.path);
        }).catch(error => {
            if (error.code === 'E_PICKER_CANCELLED') {
                // Обработка случая, когда выбор изображения был отменен пользователем
                console.log('Выбор изображения отменен');
                Alert.alert('Выбор изображения отмене');
            } else {
                // Обработка других ошибок
                console.log('Ошибка при выборе изображения:', error);
                Alert.alert(`Ошибка при выборе изображения:, ${error}`);
            }
        });
    };

    const removePicture = () => {
        setPhotoUrl('')
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData> ({
        defaultValues: {
            title: '',
            published: 'Published',
            description: '',
            photoUrl: ''
        },
    })

    useEffect(() => {
        if (photoUrl) {
            console.log('102 photoUrl', photoUrl)
            errors.photoUrl = undefined
        }
    }, [photoUrl])

    const onSubmit = (data: FormData) => {
        console.log('91 onSubmit!!!')
        console.log(data)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

            <View>

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}

                    render={({ field }) => (
                        <ExtendedTextInput
                            placeholder={'Title'}
                            onChangeText={(value) => {
                                field.onChange(value);
                                setValue("title", value);
                            }}
                            name="title"
                            style={styles.inputForm}
                        />
                    )}
                    name="title"
                />
                {errors.title && <Text style={styles.error}>{messagesEnum.requiredField}</Text>}

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

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field }) => (
                        <ExtendedTextInput
                            placeholder={'Description'}
                            numberOfLines={4}
                            maxLength={80}
                            onChangeText={(value) => {
                                field.onChange(value);
                                setValue("description", value);
                            }}
                            name="description"
                            style={styles.inputForm}
                        />
                    )}
                    name="description"
                />
                {errors.description && <Text  style={styles.error}>{messagesEnum.requiredField}</Text>}

            </View>

            <View style={styles.photoBlock}>
                <View>
                    <Text style={styles.photoBlockTitle}>Photo</Text>
                </View>

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({  }) => (
                        <ImageCropComponent
                            photoUrl={photoUrl}
                            pickPicture={pickPicture}
                            removePicture={removePicture}
                        />
                    )}
                    name="photoUrl"
                />
                {errors.photoUrl && <Text  style={styles.error}>{messagesEnum.requiredField}</Text>}

                {modalVisible && <ModalComponent
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    handleChange={handleChange}
                />}

            </View>

            <ScrollView>
                <Button title={'Add record'} onPress={handleSubmit(onSubmit)} />
            </ScrollView>

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
        color: sharedColors.black,
        margin: 0,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
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
    error: {
        color: sharedColors.red,
        fontWeight: "bold"
    }

})