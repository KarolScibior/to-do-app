import React, { useState } from 'react';
import { StyleSheet, View, CheckBox, TouchableOpacity, Text } from 'react-native';
import RegularText from '../CustomText/RegularText';
import EditModal from './EditModal';

const ListItem = props => {
  const [isSelected, setSelection] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { position, editListItem, deleteListItem } = props;

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
      <CheckBox
        value={isSelected}
        onValueChange={setSelection}
      />
      {
        renderItem()
      }
      <TouchableOpacity
        onPress={() => {
          deleteListItem(position.item.title)
        }}
      >
        <Text style={styles.closingButton}>×</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //width: '100%',
    marginTop: 4,
    //borderColor: 'black',
    //borderWidth: 1
  },
  textWrapper: {
    width: '80%',
    //borderColor: 'black',
    //borderWidth: 1
  },
  itemTextActive: {
    color: '#1A237E',
    fontSize: 16
  },
  itemTextDisabled: {
    color: 'grey',
    fontSize: 16,
    textDecorationLine: 'line-through'
  },
  closingButton: {
    fontSize: 24,
    textAlign: 'right'
  },
});

export default ListItem;