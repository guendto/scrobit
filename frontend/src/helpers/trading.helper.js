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

import validate from "./validate.helper.js";

/**
 * Determine the highest trading volume, the volume in euros on that day.
 * @param {Array} data the CoinGecko market chart data
 * @returns an array with the time and the volume
 * @throws {Error} if data validation failed
 */
const highestVolume = (data) => {
  validate.hasData(data, "total_volumes");

  const findHighest = ([prevTime, prevVolume], [time, volume]) =>
    prevVolume < volume ? [time, volume] : [prevTime, prevVolume];

  return data.total_volumes.reduce(findHighest);
};

export default { highestVolume };
