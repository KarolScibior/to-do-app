import React, { useState } from 'react';
import { StyleSheet, View, CheckBox } from 'react-native';
import RegularText from '../CustomText/RegularText';

const ListItem = (props) => {
  const [isSelected, setSelection] = useState(false);

  const { position } = props;

  return (
    <View style={styles.listItem}>
      <RegularText style={isSelected === false ? styles.itemTextActive : styles.itemTextDisabled} text ={position.item.title} />
      <CheckBox
        style={styles.checkbox}
        value={isSelected}
        onValueChange={setSelection}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    margin: 4,
    //borderBottomColor: 'black',
    //borderBottomWidth: 1
  },
  checkbox: {
    width: '20%',
    marginLeft: 16
  },
  itemTextActive: {
    color: '#1A237E',
    fontSize: 16,
    width: '80%'
  },
  itemTextDisabled: {
    color: 'grey',
    fontSize: 16,
    width: '80%',
    textDecorationLine: 'line-through'
  }
});

export default ListItem;