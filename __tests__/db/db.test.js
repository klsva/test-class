import db from "../../src/db/db.js";

describe('Test db connections', () => {
    beforeAll(async () => {
        await db.connect();
    });
    afterAll(async () => {
        await db.disconnect()
    });
    it('Test simple query', async () => {
        let res = await db
            .query('SELECT NOW()')
            .then((res) => {
                const row = res.rows[0];
                return row;
            })
            .catch((err) => {
              throw new Error(`ERROR_DURING_EXECUTING: ${err}`);
            });
        expect(res["now"]).toBeDefined();
    });
});