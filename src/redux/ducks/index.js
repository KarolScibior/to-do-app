export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';

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
  })
};

const initialState = {
  toDoList: [],
  toDoCounter: 0
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
            title: newItemTitle
          }]
        }
      } else {
        const newId = state.toDoList[state.toDoList.length - 1].id + 1;
        const newItem = {
          id: newId,
          title: newItemTitle
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
        tempList = tempList.map((item, index) => { return { id: index, title: item.title} });
        return {
          ...state,
          toDoCounter: state.toDoCounter - 1,
          toDoList: tempList
        }
      }

    case EDIT_ITEM:
      const oldTitle = action.payload.oldTitle;
      const newTitle = action.payload.newTitle;
      let tempList = state.toDoList;
      const itemId = tempList.find(item => item.title === oldTitle).id;
      tempList.splice(itemId, 1, { id: itemId, title: newTitle });
      return {
        ...state,
        toDoList: tempList
      }

    default:
      return state;
  }
}