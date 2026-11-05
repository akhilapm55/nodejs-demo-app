const test = require('node:test');
const assert = require('node:assert');
const server = require('../app');

test('Application should return a successful response', async () => {

    await new Promise(resolve => {
        server.listen(0, resolve);
    });

    try {
        const port = server.address().port;

        const response = await fetch(`http://localhost:${port}`);

        assert.strictEqual(response.status, 200);

        const body = await response.text();

        assert.strictEqual(
            body,
            'Hello! Node.js CI/CD Pipeline is working!'
        );

    } finally {
        await new Promise(resolve => server.close(resolve));
    }
});