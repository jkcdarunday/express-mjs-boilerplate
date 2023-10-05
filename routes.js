import express from 'express';
import { handleErrors } from './lib/error-handler.js';
import { deleteStatus, getStatus } from './controllers/status.js';

export function setup(app) {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.get('/status', handleErrors(getStatus));
    app.delete('/status', handleErrors(deleteStatus))
}

export default {
    setup
}
