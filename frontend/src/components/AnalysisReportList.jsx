/*
 * -*- coding: utf-8 -*-
 *
 * Copyright
 *  2021 Toni Gündoğdu
 *
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

import BuyLowSellHighResult from "./BuyLowSellHighResult";
import AnalysisType from "./types/AnalysisType";

/**
 * The analysis.
 * @component
 */
const AnalysisReportList = ({ analysis }) => {
  const { trend, trading, buyLowSellHighRange } = analysis;
  const { date, highestVolume: volume } = trading;
  const { longestBearish: total } = trend;

  return (
    <>
      <div className="label-trend">
        The <b>longest</b> bearish downward trend took {total} days.
      </div>
      <div className="label-trading">
        {date} had the <b>highest</b> trading volume for BTC with the
        total of {volume}€.
      </div>
      <BuyLowSellHighResult buyLowSellHighRange={buyLowSellHighRange} />
    </>
  );
};

AnalysisReportList.propTypes = {
  analysis: AnalysisType.isRequired,
};

export default AnalysisReportList;
