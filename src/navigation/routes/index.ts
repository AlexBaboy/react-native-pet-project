import {RecordList} from "../../components/RecordList";
import {AddRecord} from "../../components/AddRecord";

export const Routes = [
    {
        id: 1,
        name: 'Record List',
        component: RecordList
    },
    {
        id: 2,
        name: 'Create new post',
        component: AddRecord
    }
]