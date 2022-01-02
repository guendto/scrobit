/*
 * -*- coding: utf-8 -*-
 *
 * Copyright
 *  2021 Toni Gündoğdu
 *
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable import/extensions */

import dayjs from "dayjs";
import validate from "./validate.helper.js";
// import logger from "../logger.js";

/**
 * Determine the most profitable time to buy low, and sell high within
 * the given date range:
 * - the best time to sell determines the best time to buy
 * - adjusts the date range based on the time to sell
 * - stays within the given date range
 * @param {Array} data the CoinGecko market chart data
 * @returns {Object} the buy/sell dates and prices, and whether the rnage is profitable
 * @note check the returned object for the "isProfitable" flag
 * @throws {Error} if data validation failed
 */
const buyLowSellHighRange = (data) => {
  validate.hasData(data, "prices");

  const findHighest = ([prevTime, prevPrice], [time, price]) =>
    prevPrice > price ? [prevTime, prevPrice] : [time, price];

  const sell = data.prices.reduce(findHighest);
  const endAt = data.prices.findIndex(
    ([time]) => time === sell[0] // [0]=time
  );

  if (endAt <= 0) {
    return { isProfitable: false };
  }

  const findLowest = ([prevTime, prevPrice], [time, price]) =>
    prevPrice < price ? [prevTime, prevPrice] : [time, price];

  const adjustedRange = data.prices.slice(0, endAt);
  const buy = adjustedRange.reduce(findLowest);

  return { buy, sell, isProfitable: true };
};

/**
 * Return a human-readable message of buyLowSellHighRange() returned object.
 * @param {Array} range the range to convert
 * @returns {Object} the formatted strings
 */
const toHumanReadableMessage = (range) => {
  if (!range.isProfitable) {
    return {
      warning: `A nonprofitable date range. Choose a different one.`,
    };
  }

  const { buy, sell } = range;
  const [buyTime, buyPrice] = buy;
  const [sellTime, sellPrice] = sell;

  return {
    buy: `${dayjs(buyTime)} for ${buyPrice.toLocaleString()}€`,
    sell: `${dayjs(sellTime)} for ${sellPrice.toLocaleString()}€`,
  };
};

export default { buyLowSellHighRange, toHumanReadableMessage };
