import './App.css';
import { Button,TextField,Stack,List,ListItem } from '@mui/material';
import { useState } from 'react';
function App() {
  const [error_cof,setErrorCof] = useState(false);
  const [helperText_cof,setCofHelperText] = useState("");
  const [error_pass,setErrorPass] = useState(false);
  const [helperText_pass,setPassHelperText] = useState("");
    const passwordCheck = (e) =>{
      const currentValue = e.target.value;
      styleCondition(1,/(?=.{8,})/,currentValue)
      styleCondition(2,/(?=.*[a-z])/,currentValue)
      styleCondition(3,/(?=.*[A-Z])/,currentValue)
      styleCondition(4,/(?=.*[^A-Za-z0-9])/,currentValue)
      styleCondition(5,/(?=.*[0-9])/,currentValue)

    }
    const styleCondition = (idx,regx,value) =>{
      if(value.match(regx)){
        let lowerLetter = document.getElementById(`list-item${idx}`)
        lowerLetter.style = "color:green";
       }else{
        let lowerLetter = document.getElementById(`list-item${idx}`)
        lowerLetter.style = "color:red";
       }
    }

    const resetPassword = () =>{
      let password = document.getElementById("password")
      let cof_password = document.getElementById("cof_password");
      const passwordCheck = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
      if(password.value != cof_password.value){
        setErrorCof(true);
        setCofHelperText("Passwords Don't Match Try Again")
       cof_password.value = "";
      }else if(!password.value.match(passwordCheck)){
        setErrorPass(true);
        setPassHelperText("Password is invalid please try again");
        password.value = "";
      }else{
        var url = window.location.href;
        console.log(url);
        let count = 0;
        let email = "";
        for(let i = 0; i < url.length; i++){
            if(url.charAt(i) == '='){
              count++;
              break;
            }else{
              count++;
            }
        }
        for(let i = count; i < url.length; i++){
            email += url.charAt(i);
        }
        var data = {email:email,newPassword:password.value}
        fetch('http://localhost:8000/ResetPassword/',{
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(response => response.json())
        .then(responseData =>{
         alert(responseData.message)
        })
      }
    
    }
  return (
    <div className="App">
      <Stack spacing={4}>
        <TextField id = "password" label = "Password" type = "password" onInput={(event) => passwordCheck(event)} error = {error_pass} helperText = {helperText_pass}></TextField>
        <TextField id = "cof_password" label = "Confirm Password" type = "password" error ={error_cof} helperText = {helperText_cof}></TextField>
        <List sx={{ listStyleType: 'disc' }} id = "list-item">
            <ListItem id= "list-item1"    sx={{ padding: 0,textAlign: "center",listStyleType: "disc",display: "list-item",
    }} > At Least 8 Characters </ListItem>
            <ListItem id= "list-item2"    sx={{ padding: 0,textAlign: "center",listStyleType: "disc",display: "list-item",
    }} > At Least One Lowercase Letter</ListItem>
       <ListItem id= "list-item3"    sx={{ padding: 0,textAlign: "center",listStyleType: "disc",display: "list-item",
    }} > At Least One Uppercase Letter</ListItem>
            <ListItem id= "list-item4"   sx={{ padding: 0,textAlign: "center",listStyleType: "disc",display: "list-item",
    }} >At Least One Special Character</ListItem>
     <ListItem id= "list-item5"   sx={{ padding: 0,textAlign: "center",listStyleType: "disc",display: "list-item",
    }} >At Least One Number </ListItem>
           </List>
        <Button onClick={resetPassword}>Reset Password</Button>
      </Stack>

    </div>
  );
}

export default App;
