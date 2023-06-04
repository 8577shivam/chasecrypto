import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import { CryptoState} from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
}));
export function numberwithCommas(x){
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")

}
const Carousel = () => {
  const classes = useStyles();
  const [trending, setTrending] = useState([]);
  const { currency,symbol } = CryptoState();
  const fetchTrendingCoin = async () => {
    try {
      const res = await fetch(TrendingCoins(currency));
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setTrending(data);
      
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchTrendingCoin();
  }, [currency]);

  const items = trending.map((coin, index) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin.image}
          alt={coin.name}
          height="80px"
          style={{ marginBottom: "10px" }}
        />
          <span>
          {coin?.name}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 600,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{fontWeight:"bold",color:"white",fontSize:"25px"}}>
          {symbol}{numberwithCommas(coin.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      item: 2,
    },
    512: {
      item: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={2000}
        disableDotsControls
        responsive={responsive}
        disableButtonsControls
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
