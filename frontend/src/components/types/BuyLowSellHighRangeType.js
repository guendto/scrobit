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

const BuyLowSellHighRangeType = PropTypes.shape({
  buy: PropTypes.arrayOf(PropTypes.number).isRequired,
  sell: PropTypes.arrayOf(PropTypes.number).isRequired,
  isProfitable: PropTypes.bool.isRequired,
});

export default BuyLowSellHighRangeType;
