export default async function filterNodes({
	nodeType,
	nodeAttribute,
	filterName,
	driver,
}) {
	if (!nodeAttribute || !nodeType || !filterName) {
		return {
			status: 'Failed!',
			message: "nodeType, nodeAttribute, filterName can't be empty!",
		};
	}

	const query = `
      MATCH (n:${nodeType} {${nodeAttribute}: $filterName})
      RETURN n
    `;
	const session = driver.session();

	// TODO: write logic to get all nodes if filterName is not present
	// if (!filterName) {
	// 	query = `
	//   MATCH (n:${nodeType}) RETURN n
	// `;
	// }

	try {
		const result = await session.run(query, { filterName });
		const nodes = result.records.map((record) => record.get('n'));
		return nodes;
	} catch (err) {
		console.error(`Query error: ${err.message}`);
		throw new Error(`Query failed: ${err.message}`);
	} finally {
		await session.close();
	}
}
