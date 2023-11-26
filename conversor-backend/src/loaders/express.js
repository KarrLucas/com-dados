import _ from 'express-async-errors';

import express from "express";
import routes from "../api/routes/index.js";
import qs from "qs";


export default ({ app }) => {
    app.set('query parser', function (str) {
        return qs.parse(str, { arrayLimit: Infinity });
    });

    app.get('/status', (req, res) => {
        res.status(200).end();
    });

    app.head('/status', (req, res) => {
        res.status(200).end();
    });

    app.use(express.json({
        limit: '150mb',
        verify: rawBodySaver
    }));

    app.use(express.urlencoded({
        limit: '150mb',
        extended: true,
        verify: rawBodySaver,
        parameterLimit: 50000,
    }));

    app.use(express.raw({
        limit: '150mb',
        verify: rawBodySaver,
        type: '*/*'
    }));

    app.use('', routes());

    app.use('/', serverOnline);

}

var rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
};

async function serverOnline(req, res) {
    res.status(200).send(`Server Online. Sarted At: ${global.startTime.toISOString()}.\n Running on: ` + process.env.NODE_ENV);
}
