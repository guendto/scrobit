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

import { config } from "dotenv";

config();
const { PORT } = process.env;

if (!PORT) {
  throw new Error("PORT undefined");
}

export default { PORT };
