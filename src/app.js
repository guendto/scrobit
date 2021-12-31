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

import { join, resolve } from "path";
import compression from "compression";
import express from "express";
import helmet from "helmet";

const app = express();

app.use(express.static(join(resolve(), "public")));
app.use(express.json());
app.use(compression());
app.use(helmet());

export default app;
