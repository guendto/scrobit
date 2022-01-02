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

import BuyLowSellHighRangeType from "./types/BuyLowSellHighRangeType";
import profitHelper from "../helpers/profit.helper";

/**
 * Display the recommended dates to buy cheap and sell for profit.
 * If the date range is not profitable, notify the user.
 * @component
 */
const BuyLowSellHighResult = ({ buyLowSellHighRange }) => {
  const message = profitHelper.toHumanReadableMessage(
    buyLowSellHighRange
  );

  return (
    <>
      {buyLowSellHighRange.isProfitable ? (
        <div className="label-profit">
          Lo and behold! <b>Time travel</b> is a thing! Buy low, sell
          high.
          <ul>
            <li>Buy cheap on {message.buy}</li>
            <li>Sell for profit on {message.sell}</li>
          </ul>
        </div>
      ) : (
        <div className="label-warning">{message.warning}</div>
      )}
    </>
  );
};

BuyLowSellHighResult.propTypes = {
  buyLowSellHighRange: BuyLowSellHighRangeType.isRequired,
};

export default BuyLowSellHighResult;
