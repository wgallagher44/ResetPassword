import './App.css';
import { Button,TextField,Stack,List,ListItem } from '@mui/material';

function App() {
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
      
    }
  return (
    <div className="App">
      <Stack spacing={4}>
        <TextField id = "password" label = "Password" onInput={(event) => passwordCheck(event)}></TextField>
        <TextField id = "cof_password" label = "Confirm Password"></TextField>
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
        <Button>Reset Password</Button>
      </Stack>

    </div>
  );
}

export default App;
