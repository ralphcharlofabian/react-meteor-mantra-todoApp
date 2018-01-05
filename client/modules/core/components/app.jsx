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



    handleSubmit(event) {
        event.preventDefault();

        const { addUserTask } = this.props;
        const { addnewTypedTask, addnewDateTask } = this.refs;

        // Tasks.insert({
        //     text:addnewTypedTask.input.value,
        //     createdAt: addnewDateTask.input.value
            
        // });
        // console.log(addnewDateTask);


        addUserTask(
            addnewTypedTask.input.value,
            addnewDateTask.state.date            
        );

        addnewTypedTask.input.value = null;
        addnewDateTask.state.date = null;
        this.setState({open: false});
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map((task) => (
        <Task key={task._id} task = {task} />
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
                title="Dialog With Actions"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose.bind(this)}
                >
                 <TextField
                floatingLabelText="Type to add new tasks..."
                ref = "addnewTypedTask"
                />
                <DatePicker hintText="Please set your Date" openToYearSelection={true} ref="addnewDateTask"/>
                </Dialog>
          <AppBar
                title="Todo List"
            />
             <header>
                <Subheader>Incomplete Tasks ({this.props.incompleteCount}) </Subheader> 
                <RaisedButton primary={true} label="Add Task" onClick={this.handleOpen.bind(this)} />

          </header>
          <ul>
              {this.renderTasks()}
          </ul>
          </div>
        </MuiThemeProvider>
      );
    }
}

export default App;