import logger from './logger.js';

export class ErrorResponse extends Error {
    logMessage;

    constructor(message, statusCode = 500, logMessage, body = {}) {
        super(message);
        this.statusCode = statusCode;
        this.logMessage = logMessage;
        this.body = { message, ...body };
    }
}

export class AppResponse {
    statusCode;
    body;

    constructor (statusCode = 200, body = {}) {
        this.statusCode = statusCode;
        this.body = body;
    }
}

function handleResult(res) {
    return (result) => {
        if (result instanceof AppResponse) {
            return res.status(result.statusCode).send(result.body)
        }

        res.send(result)
    }
}

export function handleErrors(middleware) {
    return (req, res, next) => {
        middleware(req)
            .then(handleResult(res))
            .catch(next)
    }
}

export default function errorHandler(error, _req, res, _next) {
    if (error instanceof ErrorResponse) {
        if (error.logMessage) {
            logger.error(error.logMessage);
        }

        res.status(error.statusCode).send(error.body);

        return;
    }

    logger.error("Unhandled error", error);

    res.status(500).send({ message: "Internal server error" });
}
