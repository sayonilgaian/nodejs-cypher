export default async function filterNodes({
	driver,
	nodeType,
	nodeAttribute,
	filterName,
	limit = 25,
}) {
	console.log(nodeType, nodeAttribute, filterName);
	if (!nodeType) {
		return {
			status: 'Missing required parameters!',
			message: "nodeType can't be empty!",
		};
	}

	if ((nodeAttribute && !filterName) || (!nodeAttribute && filterName)) {
		return {
			status: 'Missing required parameters!',
			message: "nodeAttribute and filterName can't be empty at the same time!",
		};
	}

	let query = `MATCH (n:${nodeType} {${nodeAttribute}: "${filterName}"}) RETURN n`;
	const session = driver.session();

	if (!filterName || !nodeAttribute) {
		query = `MATCH (n:${nodeType}) RETURN n LIMIT ${limit}`;
	}

	try {
		const result = await session.run(query);
		const nodes = result.records.map((record) => record.get('n'));
		return {
			data: nodes,
			cypherQuery: query,
		};
	} catch (err) {
		console.error(`Query error: ${err.message}`);
		throw new Error(`Query failed: ${err.message}`);
	} finally {
		await session.close();
	}
}
