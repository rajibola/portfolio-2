import {Provider} from 'react-redux';
import store from './redux/store';
import {Routers} from './routers';
import {getPersistor} from '@rematch/persist';
import {PersistGate} from 'redux-persist/lib/integration/react';

const persistor = getPersistor();

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<h1 className="text-4xl">LOADING...</h1>}
        persistor={persistor}>
        <Routers />
      </PersistGate>
    </Provider>
  );
}

export default App;
