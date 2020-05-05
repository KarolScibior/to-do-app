import React, { useState } from 'react';
import { StyleSheet, View, CheckBox, TouchableOpacity } from 'react-native';
import RegularText from '../CustomText/RegularText';
import EditModal from './EditModal';

const ListItem = props => {
  const [isSelected, setSelection] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { position, editListItem } = props;

  const renderItem = () => {
    if (isSelected === false) {
      return (
        <TouchableOpacity
          style={styles.textWrapper}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <RegularText style={isSelected === false ? styles.itemTextActive : styles.itemTextDisabled} text ={position.item.title} />
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.textWrapper}>
          <RegularText style={isSelected === false ? styles.itemTextActive : styles.itemTextDisabled} text ={position.item.title} />
        </View>
      );
    }
  };

  return (
    <View style={styles.listItem}>
      <EditModal modalVisible={modalVisible} setModalVisible={setModalVisible} text={position.item.title} editListItem={editListItem} />
      {
        renderItem()
      }
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
  textWrapper: {
    width: '80%'
  },
  checkbox: {
    width: '20%',
    marginLeft: 16
  },
  itemTextActive: {
    color: '#1A237E',
    fontSize: 16
  },
  itemTextDisabled: {
    color: 'grey',
    fontSize: 16,
    textDecorationLine: 'line-through'
  }
});

export default ListItem;