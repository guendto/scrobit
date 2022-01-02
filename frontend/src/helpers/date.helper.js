/*
 * -*- coding: utf-8 -*-
 *
 * Copyright
 *  2021 Toni Gündoğdu
 *
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import dayjs from "dayjs";

/**
 * Convert epoch to ISO-8606 date string.
 * @param {Number} epoch the unix timestamp
 * @returns a string
 */
const toDateString = (epoch) => dayjs(epoch).format("YYYY-MM-DD");

export default { toDateString };
