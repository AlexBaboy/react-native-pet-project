import React, {memo} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RecordState} from "../../store/slices/recordSlice/types";
import {fontSizes} from "../../shared/styles/fonstSizes";
import {sharedColors} from "../../shared/styles/colors";

export const RecordItem = memo((props: RecordState) => {

    const {
        title,
        description,
        published,
        photoUrl,
        createdAt
    } = props

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.itemBlock}>
            <View style={styles.itemTopPart}>
                <Image source={{uri: photoUrl}} style={styles.recordImage}/>

                <View style={styles.descriptionPart}>
                    <Text style={styles.title}>{title}</Text>

                    <View style={styles.createdAtBlock}>
                        <Text style={styles.createdAtKey}>Created at:</Text>
                        <Text style={styles.createdAtValue}>{createdAt}</Text>
                    </View>

                    <View style={styles.publishedBlock}>
                        <Text style={styles.published}>{published}</Text>
                    </View>

                </View>

            </View>
            <View>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        height: '100%',
        //marginTop: StatusBar.currentHeight || 0,
    },
    itemBlock: {
    },
    itemTopPart: {
        flexDirection: 'row'
    },
    descriptionPart: {
        padding: fontSizes['1rem']
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
        color: sharedColors.black
    },
    createdAtBlock: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10
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

    },
    published: {

    },
    recordImage: {
        width: 100,
        height: 100,
        borderRadius: 4
    },
    description: {
        color: sharedColors.black
    }
})