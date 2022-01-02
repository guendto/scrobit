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
 * The analyze button.
 * @component
 */
const AnalyzeButton = ({ text, onClick }) => (
  <button
    className="button-round"
    type="button"
    onClick={() => onClick()}
  >
    {text}
  </button>
);

AnalyzeButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AnalyzeButton;
