import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import Note from './Note'
import { bake_cookie, read_cookie, delete_cookie} from 'sfcookies';

const cookie_key = 'NOTES';

class App extends Component {
    constructor() {
        super();

        this.state = {
            text: '',
            notes: []
        }

        this.deleteOne = this.deleteOne.bind(this);
    }

    componentDidMount() {
        this.setState({ notes: read_cookie(cookie_key) });

        const form = document.querySelector('form');
        form.onsubmit = (event) => {
            event.preventDefault();
            this.submit();
        };
    }

    submit() {
        const { notes, text } = this.state;

        if(text.length > 0) {
            notes.push({ text, id: Math.random()*100000 + 1 });

            this.setState({ notes, text: '' });

            bake_cookie(cookie_key, notes);
        }
    }

    clear() {
        delete_cookie(cookie_key);

        this.setState({ notes: [] })
    }

    deleteOne(note) {
        const notes = this.state.notes.filter((stateNote) => note.id !== stateNote.id);

        this.setState({ notes });

        bake_cookie(cookie_key, notes);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(event);
    }

    render() {
        return(
            <div><h2>Note to Self</h2>
                <Form className='form' inline>
                    <FormControl value={this.state.text} onChange={ event => { this.setState({ text: event.target.value }) } }/>
                    {' '}
                <Button onClick={ () => { this.submit() } }>Add </Button>
                </Form>
                {
                    this.state.notes.map((note, index) => {
                        return (
                            <Note key={ index } note={ note } index={index} deleteOne={this.deleteOne}/>
                        )
                    })
                }
                <hr/>
                <Button onClick={ () => { this.clear() } }>Clear Notes</Button>
            </div>
        )
    }
}

export default App;