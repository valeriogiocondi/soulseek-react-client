export default (state = [], action) => {

  switch (action.type) {

    case 'ADD_DOWNLOAD_FILE': {

    	state.push(action.payload);
      return Object.assign([], state, state);
    }

    case 'REMOVE_DOWNLOAD_FILE': {

      state.forEach((item, index, object) => {

        if (item === action.payload) {

           object.splice(index, 1);
        }  
      });
      return Object.assign([], state, state);
    }

    default:
      return state
  }
}