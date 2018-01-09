import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
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
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
const style = {
    height: 100,
    width: 500,
    margin: 5,
    textAlign: 'left',
    display: 'inline-block',
    //backgroundColor:'red'
};



export default class Task extends Component {
    constructor (props){
        super(props);
        this.state = {
            checked: props.task.checked,
            open: false,
            editTask: props.task.text,
            editTaskDate: props.task.createdAt,
            taskOnTrack: true

        };
    }
    // componentWillMount(){
    //     const {task} = this.props;
    //     if(moment( Date.now()).isBefore(task.createdAt)){
    //         this.setState({taskOnTrack:true});
    //     } else{
    //         //askOnTrack:false,
    //     }
    // };

    // taskDateChecker() {
    //     const {task} = this.props;
    //     if(moment( Date.now()).isBefore(task.createdAt)){
    //         console.log(true);
    //     }
    // }

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
                        
                            <IconMenu
                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                                <MenuItem label="Edit" primaryText="Edit" onClick={this.handleOpen.bind(this)}/>
                                <MenuItem label="Delete" primaryText="Delete" secondary={true} onClick={deleteThisTask.bind(this,task._id)}/>
                            </IconMenu>
                        }
                    />
                    
                </List>
                </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}

