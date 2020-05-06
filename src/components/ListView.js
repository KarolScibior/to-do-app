import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TextInput, ToastAndroid } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import BoldText from './CustomText/BoldText';
import ListItem from './ListItem';
import { actions } from '../redux/ducks';
import Counter from './Counter';

const ListView = () => {
  const [inputValue, setInputValue] = useState('');
  const [forceRender, setForceRender] = useState(false);

  const rerender = () => {
    setForceRender(!forceRender);
  }

  const dispatch = useDispatch();
  const addItem = itemTitle => dispatch(actions.addItem(itemTitle));
  const toDoList = useSelector(state => state.toDoList);

  console.log('lista: ', toDoList);

  const renderList = () => {
    if (toDoList.length === 0) {
      return (
        <BoldText style={styles.listItem} text={'Your list is empty!'} />
      );
    } else {
      return (
        <FlatList
            style={{width: '80%'}}
            data={toDoList}
            renderItem={position => {
              return (
                <ListItem position={position} setForceRender={rerender} />
              );
            }}
            keyExtractor={item => item.id.toString()}
          />
      );
    }
  }

  return (
    <View style={styles.container}>
          <BoldText style={styles.header} text={'ANOTHER TO DO APP'} />
          <TextInput
              value={inputValue}
              style={styles.input}
              onChangeText={text => setInputValue(text)}
              onSubmitEditing={() => {
                if (inputValue !== '') {
                  addItem(inputValue);
                  setInputValue('');
                } else {
                  ToastAndroid.show('Write something!', ToastAndroid.SHORT);
                }
              }}
            />
          {
            renderList()
          }
          <Counter />
        </View>
  );
}

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

export default ListView;
