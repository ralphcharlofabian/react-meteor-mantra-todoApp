import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import Task from './task.jsx';
import {withTracker} from 'meteor/react-meteor-data';
import {Tasks} from '../../../../lib/collections/task.js';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import AppBar from 'material-ui/AppBar';
import DatePicker from 'material-ui/DatePicker';

class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    handleOpen() {
        this.setState({open: true});
    };
    
    handleClose(){
        this.setState({open: false});
    };

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    };
    deleteThisTask(taskId) {
        const { removeUserTask } = this.props;
        removeUserTask(taskId);
    }
    toggleChecked( taskId, isChecked ) {
        const { toggleChecked } = this.props;
        toggleChecked(taskId,isChecked);
    }
    editThisTask(taskId,editedTaskName,editedTaskDate){
        console.log(taskId,editedTaskName,editedTaskDate);
        
        const { editUserTask } = this.props;
        editUserTask(taskId, editedTaskName,editedTaskDate);
    }

    handleSubmit(event) {
        event.preventDefault();

        const { addUserTask } = this.props;
        const { addnewTypedTask, addnewDateTask } = this.refs;

        addUserTask(
            addnewTypedTask.input.value,
            addnewDateTask.state.date            
        );

        addnewTypedTask.input.value = null;
        addnewDateTask.state.date = null;
        this.setState({open: false});
    }

    deleteAllCheckedTask() {
        let allTask = this.props.tasks;
        
        return allTask.map((task)=>{
            if(task.checked === true){
                const { removeUserTask } = this.props;
                removeUserTask(task._id);
            }
            
        });
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        console.log(filteredTasks);
        return filteredTasks.map((task) => (
        <Task 
            key = {task._id}
            task = {task}
            deleteThisTask ={this.deleteThisTask.bind(this)}
            editThisTask = {this.editThisTask.bind(this)}
            toggleChecked ={this.toggleChecked.bind(this)}/>
      ));
    }


    render (){

        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose.bind(this)}
            />,
            <RaisedButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleSubmit.bind(this)}
            />,
        ];


        return (
        <MuiThemeProvider>
            <div>
            
                <Dialog
                title="Add New Task"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose.bind(this)}
                >
                 <TextField
                floatingLabelText="Type to add new tasks..."
                ref = "addnewTypedTask"
                />
                <DatePicker 
                    hintText="Please set your Date"
                    openToYearSelection={true}
                    ref="addnewDateTask"
                    minDate={new Date()}/>
                </Dialog>
          <AppBar
                title="Todo List"
            />
            <div>
                <RaisedButton primary={true} label="Add Task" onClick={this.handleOpen.bind(this)} style={{marginTop:20}} />
                <Subheader>Incomplete Tasks: {this.props.incompleteCount} </Subheader> 
                {this.renderTasks()}
                <FlatButton secondary={true} label="Delete All Checked Task" onClick={this.deleteAllCheckedTask.bind(this)} style={{marginTop:20, marginLeft:280}} />
            </div>
          </div>
        </MuiThemeProvider>
      );
    }
}

export default App;