import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TextInput, ToastAndroid } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import BoldText from './src/CustomText/BoldText';
import ListItem from './src/components/ListItem';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [testList, setTestList] = useState([]);
  const [forceChange, setForceChange] = useState(true);

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
            renderItem={position => {
              return (
                <ListItem position={position} editListItem={editListItem} deleteListItem={deleteListItem} />
              );
            }}
            keyExtractor={item => item.id.toString()}
          />
      );
    }
  }

  const editListItem = (oldTitle, newTitle) => {
    let tempArr = testList;
    const itemId = tempArr.find(item => item.title === oldTitle).id;
    tempArr.splice(itemId, 1, { id: itemId, title: newTitle });
    setTestList(tempArr);
    setForceChange(!forceChange);
  }

  const deleteListItem = text => {
    if (testList.length === 1) {
      setTestList([]);
      setForceChange(!forceChange);
    } else {
      let tempArr = testList;
      const itemId = tempArr.find(item => item.title === text).id;
      tempArr.splice(itemId, 1);
      tempArr = tempArr.map((item, index) => { return { id: index, title: item.title} });
      setTestList(tempArr);
      setForceChange(!forceChange);
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
            onChangeText={text => setInputValue(text)}
            onSubmitEditing={() => {
              if (inputValue !== '') {
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
              } else {
                ToastAndroid.show('Write something!', ToastAndroid.SHORT);
              }
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
    paddingLeft: 8,
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