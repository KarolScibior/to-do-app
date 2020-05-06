import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import RegularText from './CustomText/RegularText';
import BoldText from './CustomText/BoldText';
import { actions } from '../redux/ducks';

const Counter = () => {
  const dispatch = useDispatch();
  const deleteCompleted = () => dispatch(actions.deleteCompleted());
  const counter = useSelector(state => state.toDoCounter);

  return (
    <View style={styles.container}>
      <RegularText styles={styles.color} text={`Counter: ${counter}`}/>
      <TouchableOpacity onPress={() => {
        deleteCompleted();
      }}>
        <BoldText styles={styles.color} text={'DELETE COMPLETED'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    padding: 4
  },
  color: {
    color: '#1A237E'
  }
});

export default Counter;