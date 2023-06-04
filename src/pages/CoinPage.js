import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import {
  LinearProgress,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CoinInfo from "../components/CoinInfo";
import { numberwithCommas } from "../components/Banner/Carousel";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "25px",
    borderRight: "2px solid orange",
  },
  heading: {
    fontWeight: "bold",
    fontFamily: "Montserrat",
    marginBottom: "20px",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: "25px",
    paddingBottom: "15px",
    paddingTop: "0px",
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: "25px",
    paddingTop: "10px",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
     
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  // working with API
  const fetchData = async () => {
    try {
      const response = await fetch(SingleCoin(id));
      if (!response.ok) {
        throw new Error("SingleCoin is not Working");
      }
      const data = await response.json();
  
      setCoin(data);
    } catch (Err) {
      console.error(Err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  const classes = useStyles();
  if (!coin) return <LinearProgress style={{ backgroundColor: "orangered" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200px"
          style={{ marginBottom: "20px" }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {coin?.description.en.split(". ")[0]}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Position In Market: {coin?.market_cap_rank}
            </Typography>
          </span>
          {/* current price */}
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:{"  "}
              <span style={{ fontWeight: "500", color: "gold" }}>
                {symbol}{" "}
                {numberwithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </span>
            </Typography>
          </span>
          {/* another */}
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:{" "}
              <span style={{ fontWeight: "500" }}>
                {symbol}{" "}
                {numberwithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </span>
            </Typography>
          </span>
        </div>
      </div>

      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
