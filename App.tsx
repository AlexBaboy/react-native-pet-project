import {FC} from 'react';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/store/middleware';
import {middleware} from './src/store/middleware';
import {PersistGate} from 'redux-persist/integration/react';
import {RootStack} from "./src/navigation/RootStack";
import {PaperProvider} from 'react-native-paper';

const App: FC = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={<Text>Loading...</Text>} persistor={middleware}>
                <PaperProvider>
                    <RootStack/>
                </PaperProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
