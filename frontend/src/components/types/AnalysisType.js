/*
 * -*- coding: utf-8 -*-
 *
 * Copyright
 *  2021 Toni Gündoğdu
 *
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import PropTypes from "prop-types";
import BuyLowSellHighRangeType from "./BuyLowSellHighRangeType";

const AnalysisDataType = PropTypes.shape({
  trend: PropTypes.shape({
    longestBearish: PropTypes.number,
  }).isRequired,
  trading: PropTypes.shape({
    highestVolume: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  buyLowSellHighRange: BuyLowSellHighRangeType.isRequired,
});

export default AnalysisDataType;
