export default async function shortestPath({
	driver,
	startNodeType,
	startNodeDetails = {},
	endNodeType,
	endNodeDetails = {},
	shortestPathsNumber = 1,
}) {
	if (!startNodeType || !endNodeType || !startNodeDetails || !endNodeDetails) {
		return {
			status: 'Failed!',
			message:
				"startNodeType (str), endNodeType (str), startNodeDetails (object), endNodeDetails (object) can't be empty!",
		};
	}

	let startNodeConditions = Object.keys(startNodeDetails)
		.map((key) => `n.${key}="${startNodeDetails[key]}"`)
		.reduce((prev, curr) => `${prev} AND ${curr}`);

	let endNodeConditions = Object.keys(endNodeDetails)
		.map((key) => `m.${key}="${endNodeDetails[key]}"`)
		.reduce((prev, curr) => `${prev} AND ${curr}`);

	const query = `
	  MATCH p = SHORTEST ${shortestPathsNumber} (n:${startNodeType})-[r]-+(m:${endNodeType})
        WHERE ${startNodeConditions} AND ${endNodeConditions}
        RETURN p AS result
	`;
	const session = driver.session();

	try {
		const result = await session.run(query);

		return result.records;
	} catch (err) {
		console.error(`Query error: ${err.message}`);
		throw new Error(`Query failed: ${err.message}`);
	} finally {
		await session.close();
	}
}
