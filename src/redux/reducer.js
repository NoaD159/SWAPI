const initialState = {
  items: [],
};

const ADD_ITEM = "ADD_ITEM";
const EDIT_ITEM = "EDIT_ITEM";
const DELETE_ITEM = "DELETE_ITEM";

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const editItem = (item) => ({
  type: EDIT_ITEM,
  payload: item,
});

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case EDIT_ITEM:
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      return {
        ...state,
        items: updatedItems,
      };
    case DELETE_ITEM:
      const remainingItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        items: remainingItems,
      };
    default:
      return state;
  }
};

export default reducer;
