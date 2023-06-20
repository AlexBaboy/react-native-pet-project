import {FC} from 'react';
import {Text} from 'react-native';
import {store} from './src/store/store';
import {Provider} from 'react-redux';
import {persistor} from './src/store/persistor';
import {PersistGate} from 'redux-persist/integration/react';
import {RootStack} from "./src/navigation/RootStack";
import {PaperProvider} from 'react-native-paper';

const App: FC = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
                <PaperProvider>
                    <RootStack/>
                </PaperProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
