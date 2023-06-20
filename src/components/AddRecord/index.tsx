import React from 'react';
import {ScrollView, Text, Button, SafeAreaView, StyleSheet} from 'react-native';

export const AddRecord = () => {

    const addRecord = () => {
        console.log('13 add record clicked!!!')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>Add record component</Text>

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