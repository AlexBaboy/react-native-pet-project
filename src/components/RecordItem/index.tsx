import React, {memo} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {RecordState} from "../../store/slices/recordSlice";

export const RecordItem = memo((props: RecordState) => {
  return (
      <SafeAreaView style={styles.container}>
      <Text>record item component</Text>
        <View>
            <Text>{props.title}</Text>
            <Text>{props.description}</Text>
            <TextInput>{props.published}</TextInput>
            <Text>{props.img}</Text>
        </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        height: '100%',
        //marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    }
})