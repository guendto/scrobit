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
import AnalysisType from "./types/AnalysisType";

/**
 * Display the header containing title, subtitle and description.
 * @component
 */
const TitleHeader = ({ title, subtitle, description, analysis }) => (
  <>
    <h1>{title}</h1>
    <h2>{subtitle}</h2>
    {!analysis && <h3>({description})</h3>}
  </>
);

TitleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  analysis: AnalysisType,
};

TitleHeader.defaultProps = {
  analysis: null,
};

export default TitleHeader;
