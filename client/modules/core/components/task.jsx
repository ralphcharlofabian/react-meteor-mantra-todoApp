import React, { Component } from 'react';

import {Tasks} from '../../../../lib/collections/task.js';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

const style = {
    height: 100,
    width: 500,
    margin: 5,
    textAlign: 'left',
    display: 'inline-block',
};

export default class Task extends Component {
    toggleChecked() {
        Tasks.update(this.props.task._id,{
            $set: {checked: !this.props.task.checked }
        });
    }

    deleteThisTask() {
        Tasks.remove(this.props.task._id);
    }

    render () {

        const taskClassName = this.props.task.checked ? 'checked' :'';

        return (
            <MuiThemeProvider>
                <div>
                
                <Paper style={style} zDepth={1}>
                <List>
                    {/* <Subheader>Hangout Notifications</Subheader> */}
                    <ListItem
                    leftCheckbox={
                        <Checkbox  
                            checked={this.props.task.checked}
                            onClick={this.toggleChecked.bind(this)} />}
                    primaryText={this.props.task.text}
                    secondaryText="must be date"
                    rightIconButton ={<FlatButton label="Delete" secondary={true} onClick={this.deleteThisTask.bind(this)}/>}
                    />
                    
                </List>
                </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}

