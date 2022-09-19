module.exports = errorHandler;

function errorHandler(err, req, res, next) {

    switch (true) {
        case typeof err === 'string':
            // custom application error
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 412;
            return res.status(statusCode).json({ staus: statusCode, message: err });
        case err.name === 'UnauthorizedError':
            // jwt authentication error
            return res.status(401).json({ status: 412, message: 'Unauthorized' });
        default:
            return res.status(500).json({ status: 500, message: err.message });
    }
}