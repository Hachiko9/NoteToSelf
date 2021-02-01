import React, { Component } from "react";
import {Button} from "react-bootstrap";
import '../note.css'

class Note extends Component {
    render() {
        const { note, deleteOne, index } = this.props;

        return(
            <div className='note'>
                <p>{ note.text }</p>
                <Button onClick={ () => { deleteOne(note) } }>Done</Button>
            </div>
        )
    }
}

export default Note;