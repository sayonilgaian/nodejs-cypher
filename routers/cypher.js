import { Router } from 'express';
import { connect, runQuery } from '../utils/cypher.js';

const cypherRouter = Router();

cypherRouter.get('/test', (req, res) => {
	res.end('Test is working!');
});

cypherRouter.post('/connect', async (req, res) => {
	let resNeo4j = await connect();
	res.end(resNeo4j);
});

cypherRouter.post('/query', async (req, res) => {
	try {
		// Establish connection
		const { driver } = await connect();

		// Run the query
		const queryResult = await runQuery({
			driver,
			...req.body,
		});

		// Send the response
		return res
			.status(200)
			.json({
				success: true,
				data: queryResult?.data,
				cypherQuery: queryResult.cypherQuery,
			});
	} catch (err) {
		return res.status(500).json({ success: false, error: err.message });
	}
});

export default cypherRouter;
