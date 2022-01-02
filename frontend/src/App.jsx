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

import dayjs from "dayjs";

// while building (with vite) for production:
//   warnings when minifying css:
//    > <stdin>:14:0: warning: "@charset" must be the first rule in the file
//   ..
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

import AnalyzeButton from "./components/AnalyzeButton";
import DateRangeForm from "./components/DateRangeForm";
import TitleHeader from "./components/TitleHeader";

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

      const [time, volume] = tradingHelper.highestVolume(data);

      setResults({
        trend: {
          longestBearish: trendHelper.longestBearishDownward(data),
        },
        trading: {
          highestVolume: volume.toLocaleString(),
          date: toDateString(time),
        },
        whenToBuyAndSell: profitHelper.buyLowSellHighRange(data),
      });

      setShowResults(true);
    } catch (error) {
      // eslint-disable-next-line no-alert
      window.alert(error);
    }
  };

  /**
   * Handle date range change event.
   */
  const handleDateRangeChanged = ({ name, value }) => {
    setDateRange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /**
   * Display the recommended dates to buy cheap and sell for profit.
   * @component
   */
  const RecommendTimeTravelDates = ({ message }) => (
    <div className="label-profit">
      Lo and behold! <b>Time travel</b> is a thing! Buy low, sell high.
      <ul>
        <li>Buy cheap on {message.buy}</li>
        <li>Sell for profit on {message.sell}</li>
      </ul>
    </div>
  );

  /**
   * Display the time travel "options"; whether/when to buy/sell.
   * @component
   */
  const TimeTravelOptions = () => {
    const message = profitHelper.toHumanReadableMessage(
      results.whenToBuyAndSell
    );

    return (
      <>
        {!results.whenToBuyAndSell.isProfitable ? (
          <div className="label-warning">{message.warning}</div>
        ) : (
          <RecommendTimeTravelDates message={message} />
        )}
      </>
    );
  };

  /**
   * Layout the results.
   * @component
   */
  const Results = () => (
    <>
      <div className="label-trend">
        The <b>longest</b> bearish downward trend took{" "}
        {results.trend.longestBearish} days.
      </div>
      <div className="label-trading">
        {results.trading.date} had the <b>highest</b> trading volume for
        BTC with the total of{" "}
        {results.trading.highestVolume.toLocaleString()}€.
      </div>
      <TimeTravelOptions />
    </>
  );

  /**
   * The "data processed" (date-range) footer.
   * @component
   */
  const DataProcessedFooter = () => (
    <div className="footer">
      Data processed
      <div className="date-range">
        {toDateString(dateRange.startDate)} -{" "}
        {toDateString(dateRange.endDate)}
      </div>
    </div>
  );

  /**
   * Display the results.
   * @component
   */
  const ResultsView = () => (
    <div>
      <Results />
      <div>
        <AnalyzeButton
          text="Analyze again"
          onClick={() => setShowResults(false)}
        />
        <DataProcessedFooter />
      </div>
    </div>
  );

  /**
   * Fork me on GitHub ribbon.
   * @component
   */
  const ForkMeRibbon = ({ url }) => (
    <a
      className="github-fork-ribbon"
      href={url}
      data-ribbon="Fork me on GitHub"
      title="Fork me on GitHub"
    >
      Fork me on GitHub
    </a>
  );

  return (
    <div className="app">
      <header className="header">
        <TitleHeader
          title="scrobit"
          subtitle="Scrooge's bitcoin market analyzer"
          description="the tool to analyze bitcoin market value for the given date
          range"
          showResults={showResults}
        />
        {!showResults ? (
          <DateRangeForm
            dateRange={dateRange}
            onAnalyze={handleAnalyze}
            onDateRangeChanged={handleDateRangeChanged}
          />
        ) : (
          <ResultsView />
        )}
      </header>
      <ForkMeRibbon url="https://github.com/guendto/scrobit" />
    </div>
  );
}

export default App;
