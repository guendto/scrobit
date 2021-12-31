/*
 * -*- coding: utf-8 -*-
 *
 * Copyright
 *  2021 Toni Gündoğdu
 *
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { get as GET } from "axios";
import dayjs from "dayjs";
// import logger from "../logger";

const BASE_URL = "https://api.coingecko.com/api/v3/coins/";

const makeUrl = ({ coinId, currency, from, to }) =>
  `${BASE_URL}/${coinId}/market_chart/range?vs_currency=${currency}&from=${from}&to=${to}`;

const marketChartRange = async ({
  startDate,
  endDate,
  coinId = "bitcoin",
  currency = "eur",
}) => {
  const from = dayjs(startDate).unix();
  const to = dayjs(endDate).add(1, "hour").unix();
  const url = makeUrl({ coinId, currency, from, to });
  return GET(url);
};

export default { marketChartRange };
