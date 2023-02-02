import { Component, useState} from "react";



import Registration from "./components/Registration";
import Signup from "./components/Signup";

const databaseURL = "https://baby-1306b-default-rtdb.firebaseio.com/";


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
        members: ''
    };
}

_get() {
    fetch(`${databaseURL}/members.json`)
    .then(res => {
        if(res.status != 200) {
            throw new Error(res.statusText);
        }
        return res.json();
        // console.log(res.json())
    }).then(members => {this.setState({members: members}); } )
    console.log(this.state.members)
}

_post(members) {
    return fetch(`${databaseURL}/members.json`, {
        method: 'POST',
        body: JSON.stringify(members)
    }).then(res => {
        if(res.status != 200) {
            throw new Error(res.statusText);
        }
        return res.json();
    }).then(data => {
        let nextState = this.state.members;
        nextState[data.name] = members;
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
    //   console.log(this.state.members)
      return(
        <div>
            <Registration ></Registration>
      </div>
    )
  }
}

export default App;
