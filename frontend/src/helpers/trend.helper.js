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
 * Determine the longest bearish downward trend.
 * - Uses midnight (zero-hour) data for each day
 * - Includes the data
 * @param {Array} data the CoinGecko market chart data
 * @returns
 */
const longestBearishDownward = (data) => {
  validate.hasData(data, "prices");

  let [prevTime, prev] = data.prices[0];
  let longestLen = 0;
  let currLen = 1;

  data.prices.forEach(([time, curr], index, arr) => {
    // const isLast = index === arr.length - 1;
    const isLast = Object.is(arr.length - 1, index); // es6
    const currDate = dayjs(time);

    const ofSameDay = currDate.date() === dayjs(prevTime).date();
    const isZeroHour = currDate.hour() === 0;

    if ((isZeroHour || isLast) && !ofSameDay) {
      if (curr <= prev) {
        currLen += 1;
      } else {
        currLen = 1;
      }
      if (currLen > longestLen) {
        longestLen = currLen;
      }
    }
    prevTime = time;
    prev = curr;
  });

  return longestLen;
};

export default { longestBearishDownward };
