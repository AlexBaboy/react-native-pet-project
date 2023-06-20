import React, {useState} from 'react';
import {ScrollView, Text, Button, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import * as events from "events";

export const AddRecord = () => {

    const [state, setState] = React.useState({
        title: '',
        description: '',
        published: ''
    })

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    const addRecord = () => {
        console.log('13 add record clicked!!!')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>Add record component</Text>

            <TextInput
                placeholder={'Title'}
                onChangeText={handleChange}
                value={state.title}
            />
            <TextInput
                placeholder={'published'}
                onChangeText={handleChange}
                value={state.published}
            />
            <TextInput
                placeholder={'Description'}
                numberOfLines={4}
                maxLength={80}
                onChangeText={handleChange}
                value={state.description}
            />

            <View>
                <TouchableOpacity>
                    <Text>+</Text>
                </TouchableOpacity>
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