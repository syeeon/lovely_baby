import { useState, useEffect } from "react";

import {
    signInWithEmailAndPassword,		
    onAuthStateChanged,				
    signOut,							
    getAuth,							
    updatePassword,					
} from "firebase/auth";
import { auth } from "../firebase";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LogIn = () =>{
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    
    const [user, setUser] = useState({});
  
    const auth2 = getAuth(); // π₯ 5
    const currentUser = auth2.currentUser;
    // console.log(currentUser);
    
    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {  // π₯ 3
        setUser(currentUser);
      });
    }, [user]);
  
    console.log(user);

    const login = async () => {  // π₯ 2
        try {
          const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
          console.log(user);
        } catch (error) {
          console.log(error.message);
        }
      };
    
      const logout = async () => { await signOut(auth); };   // π₯ 4
    
      const handleNewPassword = async () => { // π₯ 6
        try {
          if (user) {
            updatePassword(user, newPassword);
          } else {
            alert("λ‘κ·ΈμΈ νμΈμ.");
          }
        } catch (error) {
          console.log(error);
        }
      };
    return(
        <Container component="main" maxWidth="xs">
            <Box sx={{marginTop:8, display:'flex', flexDirection: 'column', alignItems:'center'}}>
            <Avatar sx={{m:1, bgcolor:'secondary.main'}} >
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">μ₯μ₯λ² μ΄λΉ λ‘κ·ΈμΈ</Typography>
            <TextField name="email" label="Email Address" autoComplete="email" autoFocus required margin="normal" fullWidth onChange={(event) => { setLoginEmail(event.target.value); }}  />
            <TextField name="password" label="Passord" type="password" autoComplete="current-password" margin="normal" required fullWidth onChange={(event) => { setLoginPassword(event.target.value); }}  />
            <Button variant="contained" color="primary" fullWidth sx={{m:3}}  onClick={login}>Login in</Button>
            <h4> User Logged In: </h4>
            {user?.email}
            <button onClick={logout}> Sign Out </button>
        
            <h4>Change Password</h4>
            <input placeholder="NewPassword..." onChange={event => { setNewPassword(event.target.value); }} />
            <button onClick={handleNewPassword}> New Password </button>
            </Box>
        </Container>
    )
    
}

export default LogIn;

   