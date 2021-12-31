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
import logger from "../logger.js";

/**
 * Determine the most profitable time to buy low, and sell high within
 * the given date range:
 * - the best time to sell determines the best time to buy
 * - adjusts the date range based on the time to sell
 * - stays within the given date range
 * @param {Array} data the CoinGecko market chart data
 * @returns {Object} the buy/sell dates and prices, and whether it is profitable
 * @note the returned object contains also the "profitable" flag
 * @throws {Error} if data validation failed
 */
const buyLowSellHighRange = (data) => {
  validate.hasData(data, "prices");

  const findHighest = ([prevTime, prevPrice], [time, price]) =>
    prevPrice > price ? [prevTime, prevPrice] : [time, price];

  const findLowest = ([prevTime, prevPrice], [time, price]) =>
    prevPrice < price ? [prevTime, prevPrice] : [time, price];

  const highestPrice = data.prices.reduce(findHighest); // peak price
  logger.debug("highestPrice", highestPrice);

  logger.debug("beep", data.prices[0]);

  const highestIndex = data.prices.findIndex(
    ([time]) => time === highestPrice[0] // [0]=time
  );
  logger.debug("highestIndex", highestIndex);

  if (highestIndex <= 0) {
    logger.warn("not profitable date range");
    return { isProfitable: false };
  }

  const adjustedDateRange = data.prices.slice(0, highestIndex);
  logger.debug("adjustedDateRange", adjustedDateRange);

  const lowestPrice = adjustedDateRange.reduce(findLowest);
  logger.debug("lowestPrice", lowestPrice);

  return { buy: lowestPrice, sell: highestPrice, isProfitable: true };
};

/**
 * Return a human-readable message of buyLowSellHighRange() returned object.
 * @param {Array} range the range to convert
 * @returns {Object} with the formatted strings
 */
const toHumanReadableMessage = (range) => {
  if (!range.isProfitable) {
    return {
      error: `This is a non-profitable date range. The price is only falling in this period of time.`,
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
