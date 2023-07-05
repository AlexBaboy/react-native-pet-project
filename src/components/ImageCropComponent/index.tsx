import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {CancelIcon} from "../../shared/components/CancelIcon";
import {sharedColors} from "../../shared/styles/colors";
import {PlusIcon} from "../../shared/components/PlusIcon";
import {fontSizes} from "../../shared/styles/fonstSizes";

type ImageCropComponentProps = {
    pickPicture: () => void
    removePicture: () => void
    photoUrl: string
}

const ImageCropComponent = (props: ImageCropComponentProps) => {

    const {
        pickPicture,
        removePicture,
        photoUrl
    } = props

    return (
        <View style={styles.plusBlockContainer}>
            <TouchableOpacity style={styles.plusBlock} onPress={pickPicture}>

                {photoUrl ? (
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
                            source={{ uri: photoUrl }}
                        />
                    </View>
                    ) :
                    <PlusIcon />
                }
            </TouchableOpacity>
        </View>
    );
};

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
        borderRadius: 4
    },
    imagesContainer: {

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
        height: 100,
        borderRadius: 4
    }
})

export default React.memo(ImageCropComponent);