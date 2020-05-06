import React from 'react';
import { Provider } from 'react-redux';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import store from './src/redux/store';
import ListView from './src/components/ListView';

const App = () => {
  const [fontsLoaded] = useFonts({
    'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'montserratItalic': require('./assets/fonts/Montserrat-Italic.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
        <ListView />
      </Provider>
    );
  }
};

export default App;