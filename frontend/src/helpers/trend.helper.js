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
 * Determine the longest bearish downward trend.
 * - Uses midnight (zero-hour) data for each day
 * - Includes the data
 * @param {Array} data the CoinGecko market chart data
 * @returns
 */
const longestBearishDownward = (data) => {
  validate.hasData(data, "prices");

  let [prevTime, prev] = data.prices[0];
  let longest = 0;
  let counter = 1;

  data.prices.forEach(([time, curr], index, arr) => {
    const isLast = Object.is(arr.length - 1, index);
    const currTime = dayjs(time);

    const isSameDay = currTime.date() === dayjs(prevTime).date();
    const isZeroHour = currTime.hour() === 0;

    if ((isZeroHour || isLast) && !isSameDay) {
      counter = curr <= prev ? counter + 1 : 1;
      if (counter > longest) {
        longest = counter;
      }
    }

    prevTime = time;
    prev = curr;
  });

  return longest;
};

export default { longestBearishDownward };
