/*
 * -*- coding: utf-8 -*-
 *
 * Copyright
 *  2021 Toni Gündoğdu
 *
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import logger from "loglevel";

const { TRACE, SILENT } = logger.levels;

logger.setLevel(
  process.env.NODE_ENV === "development" ? TRACE : SILENT
);

export default logger;
