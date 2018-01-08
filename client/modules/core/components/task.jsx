import React, { Component } from 'react';

import {Tasks} from '../../../../lib/collections/task.js';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
const style = {
    height: 100,
    width: 500,
    margin: 5,
    textAlign: 'left',
    display: 'inline-block',
};

//

export default class Task extends Component {
    constructor (props){
        super(props);
        this.state = {
            checked: props.task.checked,
            open: false,
            editTask: props.task.text,
            editTaskDate: props.task.createdAt

        };
    }

    onToggleCheckbox(event, isChecked) {
        this.setState({
            checked: isChecked
        });
        const {task,toggleChecked} = this.props;
        toggleChecked(task._id, isChecked);
    }
    handleOpen() {
        this.setState({open: true});
    };
    
    handleClose(){
        this.setState({open: false});
    };
    
    handleEditTask(){

    }



    handleSubmit(event) {
        event.preventDefault();

        const {  editThisTask ,task } = this.props;
        const { addnewTypedTask, addnewDateTask } = this.refs;

        editThisTask(task._id, addnewTypedTask.input.value, addnewDateTask.state.date);

        this.setState({open: false});
    }

    render () {
        const {deleteThisTask, task ,toggleChecked} = this.props;
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
                    title="Edit Task"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose.bind(this)}
                >
                 <TextField
                    floatingLabelText="Type to edit tasks..."
                    ref = "addnewTypedTask"
                    defaultValue ={this.state.editTask}
                />
                <DatePicker 
                    hintText="Edit Date"
                    openToYearSelection={true}
                    ref="addnewDateTask"
                    defaultDate={this.state.editTaskDate}/>
                </Dialog>




                <Paper style={style} zDepth={1}>
                <List>
                    <ListItem
                    leftCheckbox={
                        <Checkbox  
                            checked={this.state.checked}
                            onCheck={this.onToggleCheckbox.bind(this)} />}
                    primaryText={this.props.task.text}
                    secondaryText={ moment(this.props.task.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                    rightIconButton ={
                        <div>
                            <FlatButton label="Edit" onClick={this.handleOpen.bind(this)}/>
                            <FlatButton label="Delete" secondary={true} onClick={deleteThisTask.bind(this,task._id)}/>
                        </div>
                        }
                    />
                    
                </List>
                </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}

