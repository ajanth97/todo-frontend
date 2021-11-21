import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

function Navbar(){
    
    return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todo
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
    )
}

export default Navbar