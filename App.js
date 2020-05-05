import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import RegularText from './src/CustomText/RegularText';
import BoldText from './src/CustomText/BoldText';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [testList, setTestList] = useState([
    {
      id: 0,
      title: 'Test 0'
    },
    {
      id: 1,
      title: 'Test 1'
    },
    {
      id: 2,
      title: 'Test 2'
    },
    {
      id: 3,
      title: 'Test 3'
    },
  ]);

  const [fontsLoaded] = useFonts({
    'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'montserratItalic': require('./assets/fonts/Montserrat-Italic.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View style={styles.container}>
        <BoldText style={styles.header} text={'ANOTHER TO DO APP'} />
        <TextInput
            value={inputValue}
            style={styles.input}
            onChangeText={(text) => setInputValue(text)}
            onSubmitEditing={() => {
              setTestList([...testList, {
                id: testList[testList.length-1].id +1,
                title: inputValue
              }]);
              setInputValue('');
            }}
          />
        <FlatList
          data={testList}
          renderItem={(position) => {
            return <RegularText style={styles.listItem} text ={`${position.item.id + 1}. ${position.item.title}`} key={position.item.id.toString()} />
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    backgroundColor: '#E8EAF6'
  },
  header: {
    fontSize: 24,
    marginTop: 24,
    color: '#1A237E'
  },
  input: {
    margin: 8,
    paddingLeft: 4,
    borderColor: '#1A237E',
    borderWidth: 1,
    borderRadius: 4,
    width: '40%',
    backgroundColor: 'white',
    fontFamily: 'montserrat'
  },
  listItem: {
    color: '#1A237E',
    fontSize: 16,
    margin: 4
  }
});

export default App;