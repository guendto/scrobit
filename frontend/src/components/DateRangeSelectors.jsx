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
import DatePicker from "react-datepicker";

import DateRangeType from "./types/DateRangeType";

/**
 * Display the date range selectors.
 * @component
 */
const DateRangeSelectors = ({ dateRange, onDateRangeChanged }) => (
  <>
    From
    <DatePicker
      className="date-picker"
      selected={dateRange.startDate}
      onChange={(date) =>
        onDateRangeChanged({ name: "startDate", value: date })
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
        onDateRangeChanged({ name: "endDate", value: date })
      }
      selectsEnd
      startDate={dateRange.startDate}
      endDate={dateRange.endDate}
      minDate={dateRange.startDate}
    />
  </>
);

DateRangeSelectors.propTypes = {
  dateRange: DateRangeType.isRequired,
  onDateRangeChanged: PropTypes.func.isRequired,
};

export default DateRangeSelectors;
