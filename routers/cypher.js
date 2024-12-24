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
	const { queryType, nodeType, nodeAttribute, filterName } = req.body;

	try {
		// Establish connection
		const { driver } = await connect();

		// Run the query
		const nodes = await runQuery(
			driver,
			queryType,
			nodeType,
			nodeAttribute,
			filterName
		);

		// Send the response
		return res.status(200).json({ success: true, data: nodes });
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ success: false, error: err.message });
	}
});

export default cypherRouter;
