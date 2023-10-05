import cors from 'cors';
import express from 'express';
import config from './config.js';
import routes from './routes.js';
import errorHandler from './lib/error-handler.js';
import logger from './lib/logger.js';

const app = express();

app.use(cors({ origin: new RegExp(config.CORS.allowedOriginPattern) }));

routes.setup(app);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    const port = config.APP.PORT;
    app.listen(port, () => {
        logger.info(`Server running on port ${port}`);
    });
}
