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

import { createServer } from "http";

import config from "./config.js"; // import *before* other modules in ./src
import app from "./app.js";

const server = createServer(app);

server.listen(config.PORT, () =>
  // eslint-disable-next-line no-console
  console.info(`listen on :${config.PORT}`)
);
