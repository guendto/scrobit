/*
 * -*- coding: utf-8 -*-
 *
 * Copyright
 *  2021 Toni Gündoğdu
 *
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Check that the data is valid.
 * @param {*} data the data to validate
 * @param {String} [key] the key to look up in the data
 * @throws {Error} if data validation failed
 */
const hasData = (data, key = null) => {
  if (!data || data.length === 0) {
    throw new Error("no data");
  }
  if (!key) return;
  if (!data[key] || data[key].length === 0) {
    throw new Error(`key "${key}" missing in data`);
  }
};

export default { hasData };
