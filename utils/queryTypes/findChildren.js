export default async function findChildren({
	driver,
	startNodeDetails,
	depth = 2,
}) {
	if (!startNodeDetails) {
		return {
			status: 'Failed!',
			message: "startNodeDetails (object) can't be empty!",
		};
	}

	let initialCondition = `{ ${Object.keys(startNodeDetails)[0]}: "${
		startNodeDetails[Object.keys(startNodeDetails)[0]]
	}"}`;

	let startNodeConditions = Object.keys(startNodeDetails)
		.slice(1)
		.map((key, index) => `start.${key}="${startNodeDetails[key]}"`)
		.reduce((prev, curr) => `${prev} AND ${curr}`);

	const query = `MATCH path = (start ${initialCondition})-[*..${depth}]->(child) WHERE ${startNodeConditions} RETURN path, length(path) AS pathLength`;

	const session = driver.session();
	try {
		const result = await session.run(query);

		return {
			data: result.records,
			cypherQuery: query,
		};
	} catch (err) {
		console.error(`Query error: ${err.message}`);
		throw new Error(`Query failed: ${err.message}`);
	} finally {
		await session.close();
	}
}
