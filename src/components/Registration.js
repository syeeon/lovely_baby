import React, { Component} from 'react';

import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const databaseURL = 
"https://baby-1306b-default-rtdb.firebaseio.com/";



class Signup extends Component {
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
        fetch(`${databaseURL}/members.json`)
        .then(res => {
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
            this.setState({members: nextState});
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
    render(){
        const dateNow = new Date();
        const today = dateNow.toISOString().slice(0, 10);
        return(

    <Container component="main" maxWidth="xs">
           {Object.keys(this.state.members).map(id => {
                    const member = this.state.members[id];
                    return (
                        <div key={id}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        회원 이메일: {this.props.name}
                                    </Typography>

                                        <Grid item xs={6}>
                                            <Typography variant="h5" component="h2">
                                            태명:   {member.babyName}
                                            </Typography>

                                            <Button variant="contained" color="primary" onClick={() => this.handleDelete(id)}>삭제</Button>
                                         </Grid>
                                </CardContent>
                            </Card>
                            <br />
                        </div>
                    );
                })}
        <Box sx={{marginTop:8, display:'flex', flexDirection: 'column',  alignItems:'center'}}>
        <Avatar sx={{m:1, bgcolor:'secondary.main'}}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">쑥쑥베이비 회원가입</Typography>
        <TextField name="email" label="Email Address"autoComplete="email" type="text"  autoFocus required margin="normal" fullWidth 
        value={this.state.email} onChange={this.handleValueChange} />
        <TextField name="pwd" label="비밀번호를 입력하세요" autoComplete="pwd" type="text"  autoFocus required margin="normal" fullWidth 
        value={this.state.pwd} onChange={this.handleValueChange} />
        <TextField name="babyName" label="태명 또는 아기 이름은요?" type="text" autoComplete="text" margin="normal" required fullWidth
        value={this.state.babyName} onChange={this.handleValueChange} />
        <TextField
            required fullWidth margin="normal"
            name="birth"
            id="birth"
            label="출산예정일 또는 아기 생일은요?"
            type="date"
            defaultValue={today}
            InputLabelProps={{
                shrink: true,
            }}
            value={this.state.birth} onChange={this.handleValueChange}
        />
        <FormControlLabel control={<Checkbox value="service_apply" color="primary" />}
            label="서비스 이용약관 동의"
        />
        <FormControlLabel control={<Checkbox value="infor_apply" color="primary" />}
            label="개인정보 수집, 이용 동의"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{m:3}} 
          onClick={this.handleSubmit}>Sing in</Button>
        <Link href="#" variant="body2">계정이 있으시다면?</Link>
        </Box>
        <h1>{this.props.name}</h1>
    </Container>
        )
    }
}

export default Signup