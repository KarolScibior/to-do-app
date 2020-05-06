import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Modal, TouchableOpacity, Text, ToastAndroid } from 'react-native';
import BoldText from './CustomText/BoldText';
import { useDispatch } from 'react-redux';
import { actions } from '../redux/ducks';

const EditModal = props => {
  const [inputValue, setInputValue] = useState(text);

  const { modalVisible, setModalVisible, text, setForceRender } = props;

  const dispatch = useDispatch();
  const editItem = (oldTitle, newTitle) => dispatch(actions.editItem(oldTitle, newTitle));

  useEffect(() => {
    setInputValue(text);
  }, [text])

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.xContainer}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.closingButton}>×</Text>
              </TouchableOpacity>
            </View>
            <BoldText style={styles.text} text={'EDIT'} />
            <TextInput
              value={inputValue}
              style={styles.input}
              onChangeText={text => setInputValue(text)}
              onSubmitEditing={() => {
                if (inputValue !== '') {
                  editItem(text, inputValue);
                  setForceRender();
                  setModalVisible(false);
                } else {
                  ToastAndroid.show('Write something!', ToastAndroid.SHORT);
                }
              }}
            />
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 20
  },
  modalView: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    backgroundColor: '#E8EAF6',
    padding: 16,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  xContainer: {
    alignItems: 'flex-end',
    width: '100%'
  },
  closingButton: {
    fontSize: 24,
    textAlign: 'right'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    margin: 8,
    paddingLeft: 8,
    marginBottom: 40,
    marginTop: 16,
    borderColor: '#1A237E',
    borderWidth: 1,
    borderRadius: 4,
    width: '92%',
    backgroundColor: 'white',
    fontFamily: 'montserrat'
  },
  text: {
    color: '#1A237E',
    fontSize: 16
  }
});

export default EditModal;