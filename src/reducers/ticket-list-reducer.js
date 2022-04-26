export default (state = {}, action) => {
//create
  const { names, location, issue, id } = action;
  switch (action.type) { //looks at action type prop
  case 'ADD_TICKET':
    //.assign creates a new key-value pair where the key is the ticket's id and the value is an object with all of the ticket's properties
    //1.{} clones state obj w/ empty obj, {}, to avoid mutation of state instead of making clone first  
    //2.state is the object that will be cloned 
    //3.change to be made to new copy & always be the new added to list
    //*provides update functionality w/ key-value pairs in an object
    return Object.assign({}, state, {  
      [id]: { 
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });
//delete
  case 'DELETE_TICKET':
    let newState = { ...state };
    delete newState[id];
    return newState;
  default:  // This will generally just return the unchanged state.
    return state; //Every single time, you must return the new state object.
    //Our reducer hasn't altered anything. Instead, it made a copy of the state that was passed in as argument, altered the copy, and then returned the altered copy so it can be used elsewhere in our code.
  }
};