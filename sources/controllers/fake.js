async function empty(context) {
    context.response.body = 'It looks like you have run out of request limit';
}

async function url(context) {
    const parameters = context.request.params;

    context.response.body = `Highest bid is: ${parameters.bid}`;
}

export { empty, url };
