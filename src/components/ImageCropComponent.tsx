import React, {memo, useState} from 'react';
import {Alert, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {CancelIcon} from "../shared/components/iconComponents/CancelIcon";
import {sharedColors} from "../shared/styles/colors";
import {PlusIcon} from "../shared/components/iconComponents/PlusIcon";
import {fontSizes} from "../shared/styles/fontSizes";
import ImagePicker from "react-native-image-crop-picker";
import {ModalChooseTypePhotoComponent} from "./ModalChooseTypePhotoComponent";
import {messages} from "../constants/messages";

type ImageCropComponentProps = {
    pickPictureHandler: (url: string) => void
    removePictureHandler: () => void
    photoUrl: string
}

export const ImageCropComponent = memo((props: ImageCropComponentProps) => {

    const {
        pickPictureHandler,
        removePictureHandler,
        photoUrl
    } = props

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const cancelChooseTypePhoto = () => {
        setModalVisible(false)
    }

    const showModalChooseTypePhoto = () => {
        setModalVisible(true)
    }

    const pickPicture = (sourceType: string) => {
        let pickerFunction = ImagePicker.openPicker;

        pickerFunction = sourceType === 'file' ? ImagePicker.openPicker : ImagePicker.openCamera

        pickerFunction({
            width: 300,
            height: 400,
            cropping: true,
            mediaType: 'photo',
        })
            .then((image) => {
                pickPictureHandler(image.path);
            })
            .catch((error) => {
                if (error.code === 'E_PICKER_CANCELLED') {
                    Alert.alert(messages.records.text.deselectedImage);
                } else {
                    Alert.alert(`${messages.records.error.selectImageError}: ${error}`);
                }
            })
            .finally(cancelChooseTypePhoto);
    };

    return (
        <View style={styles.plusBlockContainer}>
            <TouchableOpacity style={styles.plusBlock} onPress={showModalChooseTypePhoto}>

                {photoUrl ? (
                    <View style={styles.imagesContainer}>
                        <TouchableOpacity style={styles.removePictureBlock} onPress={removePictureHandler}>
                            <View style={styles.cancelIconWrapper}>
                                <CancelIcon
                                    width={'24'}
                                    height={'24'}
                                    fill={sharedColors.white}
                                />
                            </View>
                        </TouchableOpacity>
                        <Image
                            style={styles.recordImage}
                            source={{ uri: photoUrl }}
                        />
                    </View>
                    ) :
                    <View style={styles.plusIconContainer}>
                        <PlusIcon />
                    </View>
                }

                {modalVisible && (
                    <ModalChooseTypePhotoComponent
                        pickPicture={() => pickPicture('file')}
                        openCamera={() => pickPicture('camera')}
                        cancelCallback={cancelChooseTypePhoto}
                    />
                )}

            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
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
        borderRadius: 4,
        position: 'relative'
    },
    imagesContainer: {

    },
    plusIconContainer: {
      alignItems: "center",
      justifyContent: 'center',
    },
    removePictureBlock: {
        position: 'absolute',
        right: 10,
        top: -5,
        width: 5,
        height: 5,
        zIndex: 5,
        border: 2,
    },
    cancelIconWrapper: {
        backgroundColor: sharedColors.blue,
        borderRadius: 50,
        width: 24,
        height: 24
    },
    recordImage: {
        width: 100,
        height: 100,
        borderRadius: 4
    },
    imagesTypeContainer: {
    },
})