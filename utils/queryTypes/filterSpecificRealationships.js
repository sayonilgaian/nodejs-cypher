export default async function filterSpecificRealationships({
	driver,
	startNodeType,
	endNodeType,
	relationshipType,
}) {

	if (!startNodeType || !endNodeType || !relationshipType) {
		return {
			status: 'Failed!',
			message: "nodeAttribute, filterName can't be empty!",
		};
	}

	const query = `
	  MATCH (n:${startNodeType})-[r:${relationshipType}]->(m:${endNodeType})
        RETURN n,r,m
	`;
	const session = driver.session();

	try {
		const result = await session.run(query);
		const relationships = result.records.map((record) => ({
			startNode: record.get('n'), // Starting node
			relationship: record.get('r'), // Relationship
			endNode: record.get('m'), // End node
		}));
		return relationships;
	} catch (err) {
		console.error(`Query error: ${err.message}`);
		throw new Error(`Query failed: ${err.message}`);
	} finally {
		await session.close();
	}
}
