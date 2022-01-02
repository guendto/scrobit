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
import PropTypes from "prop-types";

import DateRangeSelectors from "./DateRangeSelectors";
import AnalyzeButton from "./AnalyzeButton";
import DateRangeType from "./types/DateRangeType";

/**
 * Display the date range selector view.
 * @component
 */
const DateRangeForm = ({
  onAnalyze,
  dateRange,
  onDateRangeChanged,
}) => (
  <div className="date-range-view">
    <DateRangeSelectors
      dateRange={dateRange}
      onDateRangeChanged={onDateRangeChanged}
    />
    <AnalyzeButton text="Analyze now" onClick={() => onAnalyze()} />
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

DateRangeForm.propTypes = {
  onAnalyze: PropTypes.func.isRequired,
  dateRange: DateRangeType.isRequired,
  onDateRangeChanged: PropTypes.func.isRequired,
};

export default DateRangeForm;
