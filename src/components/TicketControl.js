import React from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTicket: null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = 
      // {type: 'c.TOGGLE_FORM'}
      a.toggleForm();
      dispatch(action);
    dispatch(action);
    }
  }
  //local state
  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    // dispatch(action);  //dispatches our action and updates the store
    // const action2 = {
    //   type: 'c.TOGGLE_FORM'
    // }
    // dispatch(action2);
    const action = a.addTicket(newTicket);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  }
  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }
  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteTicket(id)
    dispatch(action);
    this.setState({selectedTicket: null});
  }
  handleEditClick = () => {
    this.setState({editing: true});
  }
  handleEditingTicketInList = (ticketToEdit) => {  //If it's a new id, a new ticket will be added to the store. If it's an id that already exists, the existing ticket will be replaced
    const { dispatch } = this.props;
    const action = a.addTicket(ticketToEdit);
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing ) {      
      currentlyVisibleState = 
      <EditTicketForm 
        ticket = {this.state.selectedTicket} 
        onEditTicket = {this.handleEditingTicketInList} 
      />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = 
      <TicketDetail 
        ticket = {this.state.selectedTicket} 
        onClickingDelete = {this.handleDeletingTicket} 
        onClickingEdit = {this.handleEditClick} 
      />
      buttonText = "Return to Ticket List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = 
      <NewTicketForm 
        onNewTicketCreation={this.handleAddingNewTicketToList}  
      />
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = 
      <TicketList 
        ticketList={this.props.mainTicketList} 
          onTicketSelection={this.handleChangingSelectedTicket} 
        />
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

}

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    // mainTicketList: state  //Key-value pairs of state to be mapped from Redux to React component go here.   Key-value pairs determine the state slices that should be mapped to the component's props
    mainTicketList: state.mainTicketList,  //return slices of state to be mapped to props
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;