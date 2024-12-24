export default async function findRelationships({
	driver,
	nodeAttribute,
	filterName,
}) {
	if (!nodeAttribute || !filterName) {
		return {
			status: 'Failed!',
			message: "nodeAttribute, filterName can't be empty!",
		};
	}

	const query = `MATCH (n {${nodeAttribute}: "${filterName}"})-[r]-(m) RETURN n,r,m`;
	const session = driver.session();

	try {
		const result = await session.run(query);
		const relationships = result.records.map((record) => ({
			node: record.get('n'), // Starting node
			relationship: record.get('r'), // Relationship
			connectedNode: record.get('m'), // Connected node
		}));
		return {
			data: relationships,
			cypherQuery: query,
		};
	} catch (err) {
		console.error(`Query error: ${err.message}`);
		throw new Error(`Query failed: ${err.message}`);
	} finally {
		await session.close();
	}
}
