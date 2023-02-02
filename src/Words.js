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
            members: {},
            dialog: false,
            babyName: '',
            birth: '',
            email: '',
            pwd : ''
        };
    }

    _get() {
        fetch(`${databaseURL}/members.json`).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(members => this.setState({members: members}));
    }

    _post(member) {
        return fetch(`${databaseURL}/members.json`, {
            method: 'POST',
            body: JSON.stringify(member)
        }).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            let nextState = this.state.members;
            nextState[data.name] = member;
            this.setState({words: nextState});
        });
    }

    _delete(id) {
        return fetch(`${databaseURL}/members/${id}.json`, {
            method: 'DELETE'
        }).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(() => {
            let nextState = this.state.members;
            delete nextState[id];
            this.setState({members: nextState});
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
        const member = {
            babyName: this.state.babyName,
            birth: this.state.birth,
            email: this.state.email,
            pwd: this.state.pwd
        }
        this.handleDialogToggle();
        if (!member.email && !member.pwd) {
            return;
        }
        this._post(member);
    }

    handleDelete = (id) => {
        this._delete(id);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {Object.keys(this.state.members).map(id => {
                    const member = this.state.members[id];
                    return (
                        <div key={id}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        이메일: {member.babyName}
                                    </Typography>

                                        <Grid item xs={6}>
                                            <Typography variant="h5" component="h2">
                                               비밀번호 {member.pwd}
                                            </Typography>

                                            <Button  color="primary" onClick={() => this.handleDelete(id)}>삭제</Button>
                                         </Grid>
                                </CardContent>
                            </Card>
                            <br />
                        </div>
                    );
                })}

                <p open={this.state.dialog} onClose={this.handleDialogToggle}>
                    <p>단어 추가</p>
                        <TextField label="이메일" type="text" name="email" value={this.state.email} onChange={this.handleValueChange}/><br/>
                        <TextField label="비밀번호" type="text" name="pwd" value={this.state.pwd} onChange={this.handleValueChange}/><br/>
                        <TextField label="아기이름" type="text" name="babyName" value={this.state.babyName} onChange={this.handleValueChange}/><br/>
                        <TextField label="예정일" type="text" name="birth" value={this.state.birth} onChange={this.handleValueChange}/><br/>
                        <button  onClick={this.handleSubmit}>추가</button>
                        <button  onClick={this.handleDialogToggle}>닫기</button>
                </p>
            </div>
        );
    }
}

export default Words;