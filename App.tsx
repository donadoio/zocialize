import Home from './src/Home';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';


const App = () => {

  return (
      <Provider store={store}>
        <Home />
      </Provider>
  );
};


export default App;
