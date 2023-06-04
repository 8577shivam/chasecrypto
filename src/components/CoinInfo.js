import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import {chartDays} from  "../config/chartData"
import { CryptoState } from "../CryptoContext";
import {
  CircularProgress,
  ThemeProvider,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import { Line } from "react-chartjs-2";
import SelectButton from "./Banner/SelectButton";


const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "25px",
    padding: "40px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: "0px",
      padding: "20px",
      paddingTop: "0px",
    },
  },
}));

const CoinInfo = (props) => {
  const { coin } = props;

  const { symbol, currency } = CryptoState();
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const fetchData = async () => {
    const res = await fetch(HistoricalChart(coin.id, days, currency));
    if (!res.ok) throw new Error("Historical Chart is not working");
    const data = await res.json();
    setHistoricalData(data.prices);
  };
  useEffect(() => {
    fetchData();
  }, [currency, days]);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicalData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "orangered",
                  },
                ],
              }}
              options={
                {
                    elements:{
                        point:{
                            radius:1,

                        }
                    }
                }
              }
            />
            <div style={{
                display:"flex",
                marginTop:"20px",
                justifyContent:"space-around",
                width:"100%",
            }}>
                {chartDays.map((day)=>(
                    <SelectButton
                    key={day.value}
                    onClick={()=>setDays(day.value)}
                    selected={day.value===days}
                    >{day.label}</SelectButton>
                ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
