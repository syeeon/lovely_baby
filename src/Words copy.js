import React from 'react';


// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';



import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';




const databaseURL = "https://baby-1306b-default-rtdb.firebaseio.com/";

class Words extends React.Component {
    constructor() {
        super();
        this.state = {
            words: {},
            dialog: false,
            word: '',
            weight: ''
        };
    }

    _get() {
        fetch(`${databaseURL}/words.json`).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(words => this.setState({words: words}));
    }

    _post(word) {
        return fetch(`${databaseURL}/words.json`, {
            method: 'POST',
            body: JSON.stringify(word)
        }).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            let nextState = this.state.words;
            nextState[data.name] = word;
            this.setState({words: nextState});
        });
    }

    _delete(id) {
        return fetch(`${databaseURL}/words/${id}.json`, {
            method: 'DELETE'
        }).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(() => {
            let nextState = this.state.words;
            delete nextState[id];
            this.setState({words: nextState});
        });
    }

    componentDidMount() {
        this._get();
    }

    handleDialogToggle = () => this.setState({
        dialog: !this.state.dialog
    })

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleSubmit = () => {
        const word = {
            word: this.state.word,
            weight: this.state.weight
        }
        this.handleDialogToggle();
        if (!word.word && !word.weight) {
            return;
        }
        this._post(word);
    }

    handleDelete = (id) => {
        this._delete(id);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {Object.keys(this.state.words).map(id => {
                    const word = this.state.words[id];
                    return (
                        <div key={id}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        가중치: {word.weight}
                                    </Typography>

                                        <Grid item xs={6}>
                                            <Typography variant="h5" component="h2">
                                                {word.word}
                                            </Typography>

                                            <Button variant="contained" color="primary" onClick={() => this.handleDelete(id)}>삭제</Button>
                                         </Grid>
                                </CardContent>
                            </Card>
                            <br />
                        </div>
                    );
                })}

                <p open={this.state.dialog} onClose={this.handleDialogToggle}>
                    <p>단어 추가</p>
                        <TextField label="단어" type="text" name="word" value={this.state.word} onChange={this.handleValueChange}/><br/>
                        <TextField label="가중치" type="number" name="weight" value={this.state.weight} onChange={this.handleValueChange}/><br/>
                        <button  onClick={this.handleSubmit}>추가</button>
                        <button  onClick={this.handleDialogToggle}>닫기</button>
                </p>
            </div>
        );
    }
}

export default Words;