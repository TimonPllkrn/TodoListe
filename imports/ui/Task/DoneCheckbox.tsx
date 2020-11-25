import React from "react";
import {TaskProps} from "/imports/ui/Task/Task";
import {TasksCollection} from "/imports/api/TasksCollection";
import {Checkbox} from "@material-ui/core";

export const DoneCheckbox: React.FC<TaskProps> = ({ task }) => {

    const doneClick= (event: React.ChangeEvent<HTMLInputElement>) =>{
        TasksCollection.update(task.id, {$set : {done : event.target.checked}});
    }
    return(<div>
    <Checkbox checked={task.done} onChange={doneClick}/>
    </div>
    )
}
