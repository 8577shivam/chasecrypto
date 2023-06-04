import { Container, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
    backgroundPosition: "center",
  },
  bannerContent: {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: "25px",
  },
  tagline: {
    display:"flex",
    height:"40%",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center"
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: "15px",
              fontFamily: "Montserrat",
            }}
          >
            Crypto Chaser
          </Typography>
          <Typography
            variant="subtitle"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
           Track all your crypto currenct at one place
          </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  );
};

export default Banner;
