export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const SET_CHECKED = 'SET_CHECKED';
export const DELETE_COMPLETED = 'DELETE_COMPLETED';
export const RESET_CHECKBOX = 'RESET_CHECKBOX';

export const actions = {
  addItem: itemTitle => ({
    type: ADD_ITEM,
    payload: itemTitle
  }),
  deleteItem: itemTitle => ({
    type: DELETE_ITEM,
    payload: itemTitle
  }),
  editItem: (oldTitle, newTitle) => ({
    type: EDIT_ITEM,
    payload: { oldTitle, newTitle }
  }),
  setChecked: itemTitle => ({
    type: SET_CHECKED,
    payload: itemTitle
  }),
  deleteCompleted: () => ({ type: DELETE_COMPLETED }),
  resetCheckbox: () => ({ type: RESET_CHECKBOX })
};

const initialState = {
  toDoList: [],
  toDoCounter: 0,
  resetCheckbox: false
};

export default rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const newItemTitle = action.payload;
      if (state.toDoList.length === 0) {
        return {
          ...state,
          toDoCounter: 1,
          toDoList: [{
            id: 0,
            title: newItemTitle,
            isChecked: false
          }]
        }
      } else {
        const newId = state.toDoList[state.toDoList.length - 1].id + 1;
        const newItem = {
          id: newId,
          title: newItemTitle,
          isChecked: false
        };
        return {
          ...state,
          toDoCounter: state.toDoCounter + 1,
          toDoList: [...state.toDoList, newItem]
        }
      }

    case DELETE_ITEM:
      const title = action.payload;
      if (state.toDoList.length === 1) {
        return {
          ...state,
          toDoCounter: 0,
          toDoList: []
        }
      } else {
        let tempList = state.toDoList;
        const itemId = tempList.find(item => item.title === title).id;
        tempList.splice(itemId, 1);
        tempList = tempList.map((item, index) => { return { id: index, title: item.title, isChecked: item.isChecked} });
        return {
          ...state,
          toDoCounter: state.toDoCounter - 1,
          toDoList: tempList
        }
      }

    case EDIT_ITEM:
      const oldTitle = action.payload.oldTitle;
      const newTitle = action.payload.newTitle;
      let tempeList = state.toDoList;
      const itemId = tempeList.find(item => item.title === oldTitle).id;
      const itemIsChecked = tempeList.find(item => item.title === oldTitle).isChecked;
      tempeList.splice(itemId, 1, { id: itemId, title: newTitle, isChecked: itemIsChecked });
      return {
        ...state,
        toDoList: tempeList
      }

      case SET_CHECKED:
        const temp = action.payload;
        let tempList = state.toDoList;
        const itemeId = tempList.find(item => item.title === temp).id;
        const itemeIsChecked = !tempList.find(item => item.title === temp).isChecked;
        tempList.splice(itemeId, 1, { id: itemeId, title: temp, isChecked: itemeIsChecked });
        return {
          ...state,
          toDoList: tempList
        }

      case DELETE_COMPLETED:
        let deletedList = state.toDoList;
        deletedList = deletedList.filter(item => (item.isChecked === false));
        deletedList = deletedList.map((item, index) => {
          return {
            id: index,
            title: item.title,
            isChecked: item.isChecked
          }
        });
        return {
          ...state,
          toDoCounter: deletedList.length,
          toDoList: deletedList
        }

      case RESET_CHECKBOX:
        return {
          ...state,
          resetCheckbox: !state.resetCheckbox
        }

    default:
      return state;
  }
}