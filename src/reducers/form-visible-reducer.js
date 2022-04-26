// import * as c from './../actions/ActionTypes';

export default (state = false, action) => {
  switch (action.type) {
  case 'TOGGLE_FORM':
    return !state;  //true
  default:
    return state;  // dafault: false
  }
};