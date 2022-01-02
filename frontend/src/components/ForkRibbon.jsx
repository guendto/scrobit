/*
 * -*- coding: utf-8 -*-
 *
 * Copyright
 *  2021 Toni Gündoğdu
 *
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * "Fork me on GitHub" -ribbon.
 * @component
 */
const ForkRibbon = ({ url }) => (
  <a
    className="github-fork-ribbon"
    href={url}
    data-ribbon="Fork me on GitHub"
    title="Fork me on GitHub"
  >
    Fork me on GitHub
  </a>
);

ForkRibbon.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ForkRibbon;
