import { ErrorResponse } from '../lib/error-handler.js';

export async function getStatus(req) {
    const name = req.query.name ?? 'World';

    return { name }
}

export async function deleteStatus(req) {
    throw new ErrorResponse('Not implemented', 501, 'Someone tried to call delete status')
}
