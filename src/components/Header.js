import React from "react";
import {
  AppBar,
  Container,
  Typography,
  Toolbar,
  Select,
  MenuItem,
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

// 

const Header = () => {
  const navigate = useNavigate();
  const classes = useStyles();
    
const{currency,symbol,setCurrency}=CryptoState()
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const handleNavigate = () => {
    navigate("/");
  };


  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6"onClick={handleNavigate} className={classes.title}>
            Crypto Chaser
          </Typography>
          <Select
            variant="outlined"
            style={{
              width: "100px",
              height: "40px",
              marginLeft: "15px",
            }}
            value={currency}
            onChange={(e)=>setCurrency(e.target.value)}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
            {/* <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
            <MenuItem value="CAD">CAD</MenuItem>
            <MenuItem value="AUD">AUD</MenuItem>
            <MenuItem value="JPY">JPY</MenuItem>
            <MenuItem value="CNY">CNY</MenuItem>
            <MenuItem value="RUB">RUB</MenuItem>
            <MenuItem value="KRW">KRW</MenuItem>
            <MenuItem value="CHF">CHF</MenuItem>
            <MenuItem value="SGD">SGD</MenuItem> */}
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
};

export default Header;
