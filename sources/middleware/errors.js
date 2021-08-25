import { status } from './../helpers/index.js';

const beautify = (object) => JSON.stringify(object, undefined, 4);

function errors(application) {
    application.on('error', (error, context) => console.error('error.internal', beautify({ error })));

    return async function (context, next) {
        try {
            await next();
        } catch (error) {
            context.status = error.statusCode || error.status || status.internal_server_error;

            if (context.status < 500) {
                console.error('error.client', beautify({ error }));
                context.body = error.message;
            } else {
                context.body = error.message;
                context.app.emit('error', error, context);
            }
        }
    };
}

export { errors };
