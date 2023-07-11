import {RecordList} from "../../components/RecordList";
import {AddRecord} from "../../components/AddRecord";
import {Pages} from "./pages";

export const Routes = [
    {
        id: 1,
        name: Pages.screens.RecordList,
        component: RecordList
    },
    {
        id: 2,
        name: Pages.screens.AddRecord,
        component: AddRecord
    }
]