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

// while building (with vite) for production:
//   warnings when minifying css:
//    > <stdin>:14:0: warning: "@charset" must be the first rule in the file
//   ..
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

import AnalysisReport from "./components/AnalysisReport";
import DateRangeForm from "./components/DateRangeForm";
import TitleHeader from "./components/TitleHeader";
import ForkRibbon from "./components/ForkRibbon";

import coinGeckoService from "./services/coingecko.service";
import profitHelper from "./helpers/profit.helper";
import tradingHelper from "./helpers/trading.helper";
import trendHelper from "./helpers/trend.helper";
import dateHelper from "./helpers/date.helper";

// import logger from "./logger";
// import data from "../data/range-2020-01-19to2020-01-21.json";

function App() {
  const [dateRange, setDateRange] = useState({
    startDate: new Date("2021-12-02"),
    endDate: new Date("2021-12-24"),
  });
  const [analysis, setAnalysis] = useState();

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

      setAnalysis({
        trend: {
          longestBearish: trendHelper.longestBearishDownward(data),
        },
        trading: {
          highestVolume: volume.toLocaleString(),
          date: dateHelper.toDateString(time),
        },
        buyLowSellHighRange: profitHelper.buyLowSellHighRange(data),
      });
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
   * Show either the date range finder or the analysis report.
   */
  const showDatesOrReport = !analysis ? (
    <DateRangeForm
      dateRange={dateRange}
      onAnalyze={handleAnalyze}
      onDateRangeChanged={handleDateRangeChanged}
    />
  ) : (
    <AnalysisReport
      dateRange={dateRange}
      analysis={analysis}
      onClickAnalyzeAgain={() => setAnalysis(null)}
    />
  );

  // the App component.
  return (
    <div className="app">
      <header className="header">
        <TitleHeader
          title="scrobit"
          subtitle="Scrooge's bitcoin market analyzer"
          description="the tool to analyze bitcoin market value for the given date
          range"
          analysis={analysis}
        />
        {showDatesOrReport}
      </header>
      <ForkRibbon url="https://github.com/guendto/scrobit" />
    </div>
  );
}

export default App;
