import React from 'react';
import {
    FlatList,
    SafeAreaView,
    Text,
    StyleSheet,
    ListRenderItemInfo,
    View,
    Animated,
    Button
} from 'react-native';
import {RecordItem} from "../RecordItem";
import {useSelector} from "react-redux";
import ScrollView = Animated.ScrollView;
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {initialStateType, RecordState} from "../../store/slices/recordSlice/types";

export const RecordList = () => {

    const recordList = useSelector((state: initialStateType) => state.records)
    const {navigate} = useNavigation<NativeStackNavigationProp<any>>();

    const renderItem = ({item}: ListRenderItemInfo<RecordState>): any => {
        return (
            <RecordItem
                id={item.id}
                title={item.title}
                description={item.description}
                published={item.published}
                createdAt={item.createdAt}
                img={item.img}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
          <View>
              {!recordList.length ? (
                  <Text>Record list is Empty</Text>
              ):
                  <FlatList
                      data={recordList}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.id.toString()}
                  />
              }
          </View>
          <ScrollView>
              <Button title={'add record'}
                onPress={() => navigate('Create new post')}
              />
          </ScrollView>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        height: '100%',
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