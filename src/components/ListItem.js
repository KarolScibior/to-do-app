import React, { useState, useEffect } from 'react';
import { StyleSheet, View, CheckBox, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RegularText from './CustomText/RegularText';
import EditModal from './EditModal';
import { actions } from '../redux/ducks';

const ListItem = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [a, b] = useState(0);

  const { position, setForceRender } = props;

  const dispatch = useDispatch();
  const deleteItem = itemTitle => dispatch(actions.deleteItem(itemTitle));
  const setChecked = itemTitle => dispatch(actions.setChecked(itemTitle));
  const resetChecboxx = () => dispatch(actions.resetCheckbox());
  const resetCheckbox = useSelector(state => state.resetCheckbox);

  useEffect(() => {
    if (resetCheckbox) {
      setIsSelected(false);
      resetChecboxx();
    }
  }, [resetCheckbox]);

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
      <EditModal modalVisible={modalVisible} setModalVisible={setModalVisible} text={position.item.title} setForceRender={setForceRender} />
      <CheckBox
        value={isSelected}
        onValueChange={() => {
          setIsSelected(!isSelected);
          setChecked(position.item.title);
        }}
      />
      {
        renderItem()
      }
      <TouchableOpacity
        onPress={() => {
          deleteItem(position.item.title)
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