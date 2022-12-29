import Home from './src/Home';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist';

const App = () => {

  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <Home />
      </PersistGate>
    </Provider>
  );
};


export default App;
