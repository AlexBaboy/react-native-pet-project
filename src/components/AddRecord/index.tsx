import React, {useState} from 'react';
import {
    Button,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';
import {Published, RecordState} from "../../store/slices/recordSlice/types";
import {sharedColors} from "../../shared/styles/colors";
import {fontSizes} from "../../shared/styles/fonstSizes";
import ModalComponent from "../../shared/components/ModalPublishedComponent";
import ImageCropComponent from "../ImageCropComponent";
import {Controller, useForm} from "react-hook-form"
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import type {RecordFormData} from './types'
import {useAppDispatch} from "../../store/hooks/useAppDispatch";
import {add} from "../../store/slices/recordSlice";
import {useNavigation} from "@react-navigation/native";
import {RootStackType} from "../../navigation/RootStack";

interface ExtendedInputProps extends TextInputProps {
    name: keyof RecordState;
}

const ExtendedTextInput: React.FC<ExtendedInputProps> = (props) => {
    return <TextInput {...props} />;
};

const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    //photoUrl: yup.string().required('Photo is required'),
});

export const AddRecord = () => {

    const {navigate} = useNavigation<RootStackType>();
    const [photoUrl, setPhotoUrl] = useState<string>('');
    const [published, setPublished] = useState<string>(Published.Published);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [formSubmitted, setFormSubmitted] = useState(false)

    const dispatch = useAppDispatch()

    const showModal = () => {
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    const onChangePublished = (value: string) => {
        setPublished(value)
    }

    const pickPictureHandler = (url: string) => {
        setPhotoUrl(url)
    }

    const removePictureHandler = () => {
        setPhotoUrl('')
    }

    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm<RecordFormData>({
        defaultValues: {
            title: '',
            published: published,
            description: '',
            photoUrl: photoUrl
        },
        resolver: yupResolver(schema),
    })

    const onSubmit = (data: RecordFormData) => {

        setFormSubmitted(true)

        // все непустые поля из формы
        const nonEmptyFields: Record<string, string> = {};
        for (const key in data) {
            if (data[key as keyof RecordFormData]) {
                nonEmptyFields[key] = data[key as keyof RecordFormData] as string;
            }
        }

        // объединяем с photoUrl и published
        const recordToSave = {
            ...nonEmptyFields,
            published,
            photoUrl
        }
        dispatch(add(recordToSave as RecordState));
        navigate('RecordList')
    }

    const isSubmitDisabled = Object.keys(errors).length > 0 || !photoUrl;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                <>
                    {/* title */}
                    <Controller
                        control={control}
                        render={({field}) => (
                            <ExtendedTextInput
                                placeholder={'Title'}
                                onChangeText={(value) => {
                                    field.onChange(value);
                                    setValue("title", value);
                                    closeModal()
                                }}
                                name="title"
                                style={styles.inputForm}
                            />
                        )}
                        name="title"
                    />
                    {errors.title?.message && <Text style={styles.error}>{errors.title?.message}</Text>}

                    {/* Published */}
                    <Controller
                        control={control}
                        render={({field}) => (
                            <Pressable
                                onPress={showModal}
                            >
                                <ExtendedTextInput
                                    placeholder={'Published'}
                                    name="published"
                                    editable={false}
                                    style={styles.inputForm}
                                    value={published}
                                />
                            </Pressable>
                        )}
                        name="published"
                    />

                    {/* Description */}
                    <Controller
                        control={control}
                        render={({field}) => (
                            <ExtendedTextInput
                                placeholder={'Description'}
                                numberOfLines={4}
                                multiline={true}
                                maxLength={80}
                                onChangeText={(value) => {
                                    field.onChange(value);
                                    setValue("description", value);
                                    closeModal()
                                }}
                                name="description"
                                style={styles.inputForm}
                            />
                        )}
                        name="description"
                    />
                    {errors.description?.message && <Text style={styles.error}>{errors.description?.message}</Text>}
                </>

                <View style={styles.photoBlock}>
                    <>
                        <Text style={styles.photoBlockTitle}>Photo</Text>
                    </>

                    {/* Photo */}
                    <ImageCropComponent
                        photoUrl={photoUrl}
                        pickPictureHandler={pickPictureHandler}
                        removePictureHandler={removePictureHandler}
                    />
                    {formSubmitted && !photoUrl && <Text style={styles.error}>{'Photo is required'}</Text>}

                    {modalVisible && <ModalComponent
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        onChangePublished={onChangePublished}
                        checkedValue={published}
                    />}
                </View>

                <>
                    <Button
                        title={'Add record'}
                        onPress={handleSubmit(onSubmit)}
                        disabled={isSubmitDisabled}
                    />
                </>

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
        backgroundColor: sharedColors.bgGray,
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