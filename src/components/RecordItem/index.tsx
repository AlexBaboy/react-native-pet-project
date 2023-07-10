import React, {memo, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Published, RecordState} from "../../store/slices/recordSlice/types";
import {fontSizes} from "../../shared/styles/fonstSizes";
import {sharedColors} from "../../shared/styles/colors";
import {CancelIcon} from "../../shared/components/iconComponents/CancelIcon";
import ModalDeleteComponent from "../../shared/components/ModalDeleteComponent";
import {useAppDispatch} from "../../store/hooks/useAppDispatch";
import {remove} from "../../store/slices/recordSlice";

export const RecordItem = memo((props: RecordState) => {

    const {
        title,
        description,
        published,
        photoUrl,
        createdAt,
        id
    } = props

    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

    const dispatch = useAppDispatch()

    const setDeleteModalVisibleHandler = () => {
        setDeleteModalVisible(true)
    }

    const removeItem = (id?: number) => {
        if (!id) return
        dispatch(remove(id));
        setDeleteModalVisible(false)
    }

    const cancelRemoveItem = () => {
        setDeleteModalVisible(false)
    }

    const longPressHandler = () => {
    }

    return (
        <SafeAreaView style={styles.container}>

            <TouchableOpacity onLongPress={longPressHandler}>
                <View style={styles.itemBlock}>

                    <View style={styles.removeItemContainer}>
                        <TouchableOpacity onPress={setDeleteModalVisibleHandler} onLongPress={longPressHandler}>
                            <CancelIcon
                                width={'24'}
                                height={'24'}
                                fill={sharedColors.black}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.itemTopPart}>
                        <Image source={{uri: photoUrl}} style={styles.recordImage}/>

                        <View style={styles.descriptionPart}>
                            <Text style={styles.title}>{title}</Text>

                            <View style={styles.createdAtBlock}>
                                <Text style={styles.createdAtKey}>Created at:</Text>
                                <Text style={styles.createdAtValue}>{createdAt}</Text>

                                <View style={styles.publishedBlock}>
                                    <Text style={StyleSheet.flatten([styles.published, published === Published.Published ? styles.publishedOk : styles.draft])}>
                                        {published}
                                    </Text>
                                </View>

                            </View>

                        </View>
                    </View>

                    <>
                        <Text style={styles.description}>{description}</Text>
                    </>

                </View>
            </TouchableOpacity>

            {isDeleteModalVisible && (
                <ModalDeleteComponent
                    text={'Do you want to remove this record?'}
                    confirmCallback={removeItem}
                    cancelCallback={cancelRemoveItem}
                    setModalVisible={setDeleteModalVisible}
                    id={id}
                />
            )}

        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        height: '100%',
        width: '100%'
    },
    itemBlock: {
        marginBottom: 20,
        padding: fontSizes['1rem'],
        backgroundColor: sharedColors.white,
        borderRadius: 4,
        width: '100%',
    },
    removeItemContainer: {
        alignItems: 'flex-end',
    },
    itemTopPart: {
        flexDirection: 'row'
    },
    descriptionPart: {
        paddingHorizontal: fontSizes['1rem'],
        justifyContent: "space-between"
    },

    title: {
        fontSize: 24,
        color: sharedColors.black
    },
    createdAtBlock: {
        alignItems: 'flex-start',
        gap: 4
    },
    createdAtKey: {
        fontSize: 10,
        color: sharedColors.modalOverlayBackground
    },
    createdAtValue: {
        fontSize: 12,
        color: sharedColors.black
    },
    publishedBlock: {
        textAlign: 'center',
    } as ViewStyle,
    published: {
        padding: 8,
        borderRadius: 4,
    },
    publishedOk: {
        backgroundColor: sharedColors.lightGreen,
        color: sharedColors.darkGreen
    },
    draft: {
        backgroundColor: sharedColors.lightPink,
        color: sharedColors.red
    },
    recordImage: {
        width: 120,
        height: 120,
        borderRadius: 4
    },
    description: {
        color: sharedColors.black,
        marginTop: 8
    }
})