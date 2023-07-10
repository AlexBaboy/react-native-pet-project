import React, {useState} from 'react';
import {
    FlatList,
    SafeAreaView,
    Text,
    StyleSheet,
    ListRenderItemInfo,
    View,
    Button, TouchableOpacity
} from 'react-native';
import {RecordItem} from "../RecordItem";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RecordState} from "../../store/slices/recordSlice/types";
import {fontSizes} from "../../shared/styles/fonstSizes";
import {sharedColors} from "../../shared/styles/colors";
import {DeleteIcon} from "../../shared/components/iconComponents/DeleteIcon";
import ModalDeleteComponent from "../../shared/components/ModalDeleteComponent";
import {useAppDispatch} from "../../store/hooks/useAppDispatch";
import {clearAll} from "../../store/slices/recordSlice";
import {getAllRecords} from "../../store/selectors/records";

export const RecordList = () => {

    const recordList = useSelector(getAllRecords)
    const {navigate} = useNavigation<NativeStackNavigationProp<any>>();
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const dispatch = useAppDispatch()

    const renderItem = ({item}: ListRenderItemInfo<RecordState>): React.JSX.Element => {

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

    const showRemoveAllModal = () => {
        setDeleteModalVisible(true)
    }

    const removeAll = () => {
        dispatch(clearAll());
        setDeleteModalVisible(false)
    }

    const cancelRemoveAll = () => {
        setDeleteModalVisible(false)
    }

    return (
        <SafeAreaView style={styles.container}>
              <View style={styles.recordsContainer}>
                  {!recordList.length ? (
                      <Text>Record list is Empty</Text>
                  ):
                      <View>
                          <View style={styles.deleteBlock}>
                              <TouchableOpacity onPress={showRemoveAllModal}>
                                <DeleteIcon
                                    width={'24'}
                                    height={'24'}
                                />
                              </TouchableOpacity>
                          </View>
                          <FlatList
                              data={recordList}
                              renderItem={renderItem}
                              keyExtractor={(item) => item.id!.toString()}
                          />
                      </View>
                  }
              </View>
              <View style={styles.bottomButton}>
                  <Button title={'add record'}
                    onPress={() => navigate('Create new post')}
                  />
              </View>

            {isDeleteModalVisible && (
                <ModalDeleteComponent
                    text={'Do you want to remove all records?'}
                    confirmCallback={removeAll}
                    cancelCallback={cancelRemoveAll}
                    setModalVisible={setDeleteModalVisible}
                />
            )}

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
        backgroundColor: sharedColors.bgGray,
        position: "relative",
    },
    recordsContainer: {
      height: '100%',
      paddingBottom: 40,
    },
    deleteBlock: {
        width: '100%',
        alignItems: 'flex-end',
    },
    bottomButton: {
        position: 'absolute',
        bottom: 0,
        left: fontSizes['1rem'],
        width: '100%',
        zIndex: 5
    }
})