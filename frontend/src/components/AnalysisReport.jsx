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

import AnalysisReportList from "./AnalysisReportList";
import DateRangeType from "./types/DateRangeType";
import AnalysisType from "./types/AnalysisType";
import AnalyzeButton from "./AnalyzeButton";

import dateHelper from "../helpers/date.helper";

/**
 * Display the analysis report.
 * @component
 */
const AnalysisReport = ({
  dateRange,
  analysis,
  onClickAnalyzeAgain,
}) => (
  <div>
    <AnalysisReportList analysis={analysis} />
    <div>
      <AnalyzeButton
        text="Analyze again"
        onClick={onClickAnalyzeAgain}
      />
      <div className="footer">
        Data processed
        <div className="date-range">
          {dateHelper.toDateString(dateRange.startDate)} -{" "}
          {dateHelper.toDateString(dateRange.endDate)}
        </div>
      </div>
    </div>
  </div>
);

AnalysisReport.propTypes = {
  dateRange: DateRangeType.isRequired,
  analysis: AnalysisType.isRequired,
  onClickAnalyzeAgain: PropTypes.func.isRequired,
};

export default AnalysisReport;
