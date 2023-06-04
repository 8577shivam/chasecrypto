import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { CoinList } from "../config/api";
import {
  CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  makeStyles,
} from "@material-ui/core";

import { useNavigate } from "react-router-dom";
import { numberwithCommas } from "./Banner/Carousel";
import { Pagination } from "@material-ui/lab";
const useStyles = makeStyles(() => ({
  row: {
    background: "#16171a",
    cursor: "pointer",
    "&:hover": {
      background: "rgba(0,0,0,0.4)",
    },
    padding: "3px",
  },
  pagination: {
    "&.MuiPaginationItem-root": {
      color: "orangered",
    },
  },
}));
const CoinsTable = () => {
  const navigate = useNavigate();

  const classes = useStyles();
  const { symbol, currency } = CryptoState();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const response = await fetch(CoinList(currency));
      if (!response.ok) {
        throw new Error("Unable to fetcch data from CoinList");
      }
      const data = await response.json();
      setCoins(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
 
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: "18px", fontFamily: "Montserrat" }}
        >
          CryptoCurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Type here Crypto Currency name.."
          variant="outlined"
          style={{ width: "100%", marginBottom: "18px" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <>
              <Table>
                <TableHead style={{ background: "orangered" }}>
                  <TableRow>
                    {[
                      "Crypto Currency",
                      "Price",
                      "24H Change",
                      "Market Cap",
                    ].map((heading) => {
                      return (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                          }}
                          key={heading}
                          align={heading === "Crypto Currency" ? "" : "right"}
                        >
                          {heading}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          onClick={() => navigate(`coins/${row.id}`)}
                          className={classes.row}
                          key={row.name}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              display: "flex",
                              gap: "15px",
                              cursor: "pointer",
                            
                            }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50px"
                              style={{ marginBottom: "10px" }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: "22px",
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "grey" }}>{row.name}</span>
                            </div>
                          </TableCell>
                          <TableCell align="right" style={{fontSize:"16px"}}>
                            {symbol}{" "}
                            {numberwithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14,203,129)" : "red",
                              fontWeight: "bold",
                              fontSize:"16px"
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right" style={{fontSize:"16px"}}>
                            {symbol}{" "}
                            {numberwithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </>
          )}
        </TableContainer>
        <Pagination
          style={{
            padding: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          color="primary"
          count={Math.ceil(handleSearch()?.length / 10)}
          onChange={(_,value)=>{
            setPage(value)
            window.scroll(0,450)
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
