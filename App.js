import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TextInput } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import RegularText from './src/CustomText/RegularText';
import BoldText from './src/CustomText/BoldText';
import ListItem from './src/components/ListItem';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [testList, setTestList] = useState([]);

  const [fontsLoaded] = useFonts({
    'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'montserratItalic': require('./assets/fonts/Montserrat-Italic.ttf'),
  })

  const renderList = () => {
    if (testList.length === 0) {
      return (
        <BoldText style={styles.listItem} text={'Your list is empty!'} />
      );
    } else {
      return (
        <FlatList
            style={{width: '80%'}}
            data={testList}
            renderItem={(position) => {
              return (
                <ListItem position={position} />
              );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
      );
    }
  }

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
              if (testList.length === 0) {
                setTestList([{
                  id: 0,
                  title: inputValue
                }]);
              } else {
                setTestList([...testList, {
                  id: testList[testList.length-1].id +1,
                  title: inputValue
                }]);
              }
              setInputValue('');
            }}
          />
        {
          renderList()
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
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
    width: '80%',
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