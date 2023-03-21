import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { chartFetch } from '../redux/action/action';
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function CryptoChart() {
  const [coin, setCoin] = useState("bitcoin");
  const [targetCurrency, setTargetCurrency] = useState("usd");
  const [intervalValue, setintervalValue] = useState({ day: 1, interval: "hourly" });

  let data = []

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(chartFetch(coin, intervalValue, targetCurrency));
  }, [coin, intervalValue, targetCurrency]);

  const chartData = useSelector((state) => state.chart);
  // console.log(chartData.chartData.prices)
  if (chartData.chartData.prices) {
    data = chartData.chartData.prices
  }
  // console.log(data)


  const dataToPlot = data.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));


  console.log(dataToPlot)



  const handleIntervalChange = (event) => {
    // console.log(event.target.value)
    switch (event.target.value) {
      case '0':
        setintervalValue({ day: 1, interval: "hourly" });
        break
      case '1':
        setintervalValue({ day: 7, interval: "daily" });
        break
      case '2':
        setintervalValue({ day: 30, interval: "daily" });
        break
      case '3':
        setintervalValue({ day: 180, interval: "monthly" });
        break
      case '4':
        setintervalValue({ day: 365, interval: "yearly" });
        break
      default:
        console.log("default switch radio button called")
        setintervalValue({ day: 1, interval: "hourly" });
        break
    }

  };

  // console.log(intervalValue)

  const [chartType, setChartType] = useState("LineChart");
  const handleChartTypeChange = (event) => {
    // console.log(event.target.value)
    setChartType(event.target.value)
  }

  const handleTargetCurrencyChange = (event) => {
    // console.log(event.target.value)
    setTargetCurrency(event.target.value)
  }

  const handleCoinChange = (event) => {
    // console.log(event.target.value)
    setCoin(event.target.value)
  }




  const LineChart = () => {
    return (
      <div >
        <div className="">
          <div  >
            <Line
              className="w-full h-60"
              height={500}
              datasetIdKey="id"
              data={{
                labels: dataToPlot.map((val) => {
                  let date = new Date(val.x);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                      : `${date.getHours()}:${date.getMinutes()}AM`;
                  return intervalValue.day === 1 ? time : date.toLocaleDateString("default", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  });
                }),
                datasets: [
                  {
                    spanGaps: true,
                    id: 1,
                    borderColor: "#FFA500",
                    backgroundColor: "#FFA500",
                    pointBorderColor: "transparent",
                    pointBorderWidth: 3,
                    pointRadius: 2,
                    label: `${coin} in ${targetCurrency}`,
                    data: dataToPlot.map((val) => val.y),
                  },
                ],
              }}
              options={{
                color: "white",
                responsive: true,
                indexAxis: "x",
                tension: 0.04,
                scales: {
                  x: {
                    grid: {
                      display: true,
                      drawBorder: true,
                      borderDash: [10],
                      border: false,
                    },
                    ticks: {
                      source: "auto",
                      maxTicksLimit: 20,
                      font: {
                        size: "10px",
                      },
                      color: "green",
                    },
                  },
                  y: {
                    grid: {
                      border: true,
                      drawBorder: true,
                    },
                    ticks: {
                      color: "green"
                    }
                  },
                },
                plugins: {
                  tooltip: {
                    displayColors: false,
                    backgroundColor: "gray",
                  },
                  legend: {
                    display: false,
                    align: "end",
                    labels: {
                      color: "white",
                      pointStyleWidth: 12,
                      usePointStyle: true,
                      pointStyle: "circle",
                      padding: 2,
                    },
                  },
                  title: {
                    display: true,
                  },
                  datalabels: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>
    )
  }


  const BarChart = () => {
    return (
      <div>
        <div className="w-full h-[400px] ">
          <Bar
            data={{
              labels: dataToPlot.map((val) => {
                let date = new Date(val.x);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                    : `${date.getHours()}:${date.getMinutes()}AM`;
                return intervalValue.day === 1 ? time : date.toLocaleDateString("default", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                });
              }),
              datasets: [
                {
                  label: `${coin} in ${targetCurrency}`,
                  data: dataToPlot.map((val) => val.y),
                  borderColor: "#FFA500",
                  backgroundColor: "#FFA500",
                },
              ],
            }}
            options={{
              responsive: true,
              indexAxis: "x",
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    maxTicksLimit: 20,
                    color: "white",
                  },
                },
                y: {
                  ticks: {
                    color: "white",
                  }
                }
              },
              plugins: {
                legend: {
                  display: true,
                  align: "end",
                  labels: {
                    color: "white",
                    pointStyleWidth: 15,
                    usePointStyle: true,
                    pointStyle: "circle",
                    padding: 5,
                  },
                },
                title: {
                  display: true,
                },
                datalabels: {
                  display: false,
                },
              },
              maintainAspectRatio: false,
            }}
          />
        </div>

      </div>
    )
  }



  return (
    <div>CryptoChart
      <div >


        <div className="btn-group " onChange={handleIntervalChange}>
          <input
            type="radio"
            name="options"
            value={0}
            data-title="1D"
            className="btn btn-sm btn-outline btn-primary"
          />
          <input
            type="radio"
            name="options"
            value={1}
            data-title="1W"
            className="btn btn-sm btn-outline btn-primary"
          />
          <input
            type="radio"
            name="options"
            value={2}
            data-title="1M"
            className="btn btn-sm btn-outline btn-primary"
          />
          <input
            type="radio"
            name="options"
            value={3}
            data-title="6M"
            className="btn btn-sm btn-outline btn-primary"
          />
          <input
            type="radio"
            name="options"
            value={4}
            data-title="1Y"
            className="btn btn-sm btn-outline btn-primary"
          />
        </div>



        <div>
          <div >
            <select className="select w-40 max-w-xs select-info" value={chartType} onChange={handleChartTypeChange}>
              <option value={"LineChart"}>Line Chart</option>
              <option value={"BarChart"}>Bar Chart</option>
            </select>
          </div>
        </div>


        <div>
          <div >
            <select className="select w-40 max-w-xs select-info" value={targetCurrency} onChange={handleTargetCurrencyChange}>
              <option value={"inr"}>INR</option>
              <option value={"usd"}>USD</option>
              <option value={"eur"}>EUR</option>
            </select>
          </div>
        </div>


        <div>
          <div >
            <select className="select w-40 max-w-xs select-info" value={coin} onChange={handleCoinChange}>
              <option value={"bitcoin"}>Bitcoin</option>
              <option value={"ethereum"}>Ethereum</option>
              <option value={"litecoin"}>Litecoin</option>
              <option value={"ripple"}>Ripple</option>
              <option value={"bitcoin-cash"}>Bitcoin Cash</option>
              <option value={"tether"}>Tether</option>
            </select>
          </div>
        </div>


        {(data.length === 0 || undefined) ?
          (
            <div>loading......</div>
          ) : (<div className="w-10/12 h-64">
            {(chartType === "LineChart") ? (<div><LineChart /></div>) : (<div> <BarChart /></div>)}
          </div>)
        }




      </div >
    </div >
  )
}
