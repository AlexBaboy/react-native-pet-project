import React, {useEffect} from 'react';
import {
    FlatList,
    SafeAreaView,
    Text,
    StyleSheet,
    ListRenderItemInfo,
    View,
    Button
} from 'react-native';
import {RecordItem} from "../RecordItem";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {initialStateType, RecordState} from "../../store/slices/recordSlice/types";
import {fontSizes} from "../../shared/styles/fonstSizes";

const mockedRecords = [
    {"createdAt": "07.07.2023, 11:33:53", "description": "hfhjkpppp", "id": 1688718833545, "photoUrl": "file:///storage/emulated/0/Android/data/com.petproject/files/Pictures/fa4c0948-cef5-4e61-bf61-28a4d34cc633.jpg", "published": "Published", "title": "hghh"},
    {"createdAt": "07.07.2023, 11:39:03", "description": "ppoi", "id": 1688719143701, "photoUrl": "file:///storage/emulated/0/Android/data/com.petproject/files/Pictures/4cfef6ea-0597-43e4-a1ce-0b5561f65ab1.jpg", "published": "Published", "title": "wdgg"},
    {"createdAt": "07.07.2023, 11:40:33", "description": "ppoii", "id": 1688719233929, "photoUrl": "file:///storage/emulated/0/Android/data/com.petproject/files/Pictures/2fe3fb2d-82c6-43de-a8f5-68dbd3b4c548.jpg", "published": "Published", "title": "qwee"}
]


    export const RecordList = () => {

    const recordList = useSelector((state: initialStateType) => state.records)
    const {navigate} = useNavigation<NativeStackNavigationProp<any>>();

    useEffect(() => {
        //setUpdatedRecordList(recordList);
        console.log('28 recordList', recordList)
        console.log('28 recordList?.records', recordList?.records)
    }, [recordList]);

    const renderItem = ({item}: ListRenderItemInfo<RecordState>): any => {

        console.log('41 item', item)

        return (
            <RecordItem
                id={item.id}
                title={item.title}
                description={item.description}
                published={item.published}
                createdAt={item.createdAt}
                photoUrl={item.photoUrl}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
              <View>
                  {!recordList?.records.length ? (
                      <Text>Record list is Empty</Text>
                  ):
                      <FlatList
                          data={recordList?.records}
                          renderItem={renderItem}
                          keyExtractor={(item) => item.id.toString()}
                      />
                  }
              </View>
              <View>
                  <Button title={'add record'}
                    onPress={() => navigate('Create new post')}
                  />
              </View>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        flexGrow: 1,
        height: '100%',
        padding: fontSizes['1rem'],
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