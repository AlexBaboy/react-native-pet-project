import React, {useState} from 'react';
import {
    Button,
    FlatList,
    ListRenderItemInfo,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {RecordItem} from "./RecordItem";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {RecordState} from "../store/slices/recordSlice/types";
import {fontSizes} from "../shared/styles/fontSizes";
import {sharedColors} from "../shared/styles/colors";
import {DeleteIcon} from "../shared/components/iconComponents/DeleteIcon";
import {ModalDeleteComponent} from "./ModalDeleteComponent";
import {useAppDispatch} from "../store/hooks/useAppDispatch";
import {clearAllRecords} from "../store/slices/recordSlice";
import {getAllRecords} from "../store/selectors/records";
import {RootStackType} from "../navigation/RootStack";
import {messages} from "../constants/messages";

export const RecordList = () => {

    const dispatch = useAppDispatch()
    const recordList = useSelector(getAllRecords)
    const {navigate} = useNavigation<RootStackType>();
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

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
        dispatch(clearAllRecords());
        setDeleteModalVisible(false)
    }

    const cancelRemoveAll = () => {
        setDeleteModalVisible(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.recordsContainer}>
                {!recordList.length ? (
                        <Text>
                            {messages.records.text.emptyList}
                        </Text>
                    ) :
                    <>
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
                    </>
                }
            </View>
            <View style={styles.bottomButton}>
                <Button
                    title={messages.records.titles.addRecord}
                    onPress={() => navigate('Add Record')}
                />
            </View>

            {isDeleteModalVisible && (
                <ModalDeleteComponent
                    text={messages.records.questions.removeAllRecordsRequest}
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
        paddingBottom: 80,
    },
    deleteBlock: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 10
    },
    bottomButton: {
        position: 'absolute',
        bottom: 0,
        left: fontSizes['1rem'],
        width: '100%',
        zIndex: 5
    }
})