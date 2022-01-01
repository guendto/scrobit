/*
 * -*- coding: utf-8 -*-
 *
 * Copyright
 *  2021 Toni Gündoğdu
 *
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

// while building (with vite) for production:
//   warnings when minifying css:
//    > <stdin>:14:0: warning: "@charset" must be the first rule in the file
//   ..
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

import coinGeckoService from "./services/coingecko.service";
import profitHelper from "./helpers/profit.helper";
import tradingHelper from "./helpers/trading.helper";
import trendHelper from "./helpers/trend.helper";
// import logger from "./logger";
// import data from "../data/range-2020-01-19to2020-01-21.json";

function App() {
  const [dateRange, setDateRange] = useState({
    startDate: new Date("2021-12-02"),
    endDate: new Date("2021-12-24"),
  });
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({});

  /**
   * Convert epoch to ISO-8606 date string.
   * @param {Number} epoch the unix timestamp
   * @returns a string
   */
  const toDateString = (epoch) => dayjs(epoch).format("YYYY-MM-DD");

  /**
   * Handle the "Analyze now" event.
   */
  const handleAnalyze = async () => {
    try {
      const { startDate, endDate } = dateRange;

      const res = await coinGeckoService.marketChartRange({
        startDate,
        endDate,
      });

      const { data } = res;

      if (!data.prices || data.prices.length === 0) {
        throw new Error("No data, try a different date range");
      }

      const range = profitHelper.buyLowSellHighRange(data);
      const { isProfitable } = range;

      const [time, volume] = tradingHelper.highestVolume(data);

      setResults({
        trend: {
          longestBearish: trendHelper.longestBearishDownward(data),
        },
        trading: {
          highestVolume: volume.toLocaleString(),
          date: toDateString(time),
        },
        whenToBuyAndSell: {
          isProfitable,
          range,
        },
      });

      setShowResults(true);
    } catch (error) {
      // TODO: use a notification, instead.
      window.alert(error);
    }
  };

  const Title = () => (
    <div>
      <h1>scrobit</h1>
      <h2>Scrooge&apos;s bitcoin market analyzer</h2>
      {!showResults && (
        <h3>
          (the tool to analyze bitcoin market value for the given date
          range)
        </h3>
      )}
    </div>
  );

  const handleDateRange = ({ name, value }) => {
    setDateRange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const SelectDateRange = () => (
    <>
      From
      <DatePicker
        className="date-picker"
        selected={dateRange.startDate}
        onChange={(date) =>
          handleDateRange({ name: "startDate", value: date })
        }
        selectsStart
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
      />
      To
      <DatePicker
        className="date-picker"
        selected={dateRange.endDate}
        onChange={(date) =>
          handleDateRange({ name: "endDate", value: date })
        }
        selectsEnd
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        minDate={dateRange.startDate}
      />
    </>
  );

  const SelectDateRangeView = () => (
    <div className="date-range-view">
      <SelectDateRange />
      <div>
        <button
          onClick={() => handleAnalyze()}
          className="button-round"
          type="button"
        >
          Analyze now
        </button>
      </div>
      <div className="footer">
        Market chart history data provided by{" "}
        <a
          className="link"
          href="https://coingecko.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          CoinGecko
        </a>
        .
      </div>
    </div>
  );

  const NonProfitableWarning = () => (
    <div className="label-warning">
      This is a <i>non-profitable</i> date range. The price is{" "}
      <b>only falling</b> in this period of time.
    </div>
  );

  const RecommendedBuyAndSellDates = () => {
    const { range } = results.whenToBuyAndSell;
    const message = profitHelper.toHumanReadableMessage(range);

    return (
      <div className="label-profit">
        <b>Lo and behold</b>, time travel is possible. Buy low and sell
        high. Simple.
        <ul>
          <li>
            <b>Buy</b> on {message.buy}
          </li>
          <li>
            <b>Sell</b> on {message.sell}
          </li>
        </ul>
        Now, go make some serious dough.
      </div>
    );
  };

  const TimeTravelOptions = () => (
    <>
      {!results.whenToBuyAndSell.isProfitable ? (
        <NonProfitableWarning />
      ) : (
        <RecommendedBuyAndSellDates />
      )}
    </>
  );

  const ResultsView = () => (
    <div>
      <div className="label-trend">
        The <i>longest bearish downward trend</i> took{" "}
        <b>{results.trend.longestBearish} days</b> during this period of
        time.
      </div>
      <div className="label-trading">
        <b>{results.trading.date}</b> had the{" "}
        <i>highest trading volume</i> for BTC with total of{" "}
        <b>{results.trading.highestVolume.toLocaleString()}€</b>.
      </div>
      <TimeTravelOptions />
      <div>
        <button
          className="button-round "
          type="button"
          onClick={() => setShowResults(false)}
        >
          Analyze again
        </button>
        <div className="footer">
          Data processed
          <div className="date-range">
            {toDateString(dateRange.startDate)} -{" "}
            {toDateString(dateRange.endDate)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      <header className="header">
        <Title />
        {showResults ? <ResultsView /> : <SelectDateRangeView />}
      </header>
      <a
        className="github-fork-ribbon"
        href="https://github.com/guendto/scrobit"
        data-ribbon="Fork me on GitHub"
        title="Fork me on GitHub"
      >
        Fork me on GitHub
      </a>
    </div>
  );
}

export default App;
