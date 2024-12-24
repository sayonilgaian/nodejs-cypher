import * as neo4j from 'neo4j-driver';
import filterNodes from './queryTypes/filterNodes.js';
import filterRelationships from './queryTypes/filterRelationships.js';
import filterSpecificRealationships from './queryTypes/filterSpecificRealationships.js';
import shortestPath from './queryTypes/shortestPath.js';

export async function connect() {
	const URI = 'neo4j+s://ce441ab3.databases.neo4j.io';
	const USER = 'neo4j';
	const PASSWORD = 'R1_T1ctKitPIxL__MFNnpWvVihLRqGGD1_M0YxTRBTk';
	let driver;

	try {
		driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
		const serverInfo = await driver.getServerInfo();
		console.log('Connection established');
		console.log(serverInfo);
		return {
			driver: driver,
			message: 'Connection established',
		};
	} catch (err) {
		return {
			driver: null,
			message: `Connection error\n${err}\nCause: ${err.cause}`,
		};
	}
}

export async function runQuery({ driver, ...body }) {
	switch (body?.queryType) {
		case 'filter-nodes':
			return filterNodes({ driver, ...body });
		case 'filter-edges':
			return filterRelationships({ driver, ...body });
		case 'specific-edges':
			return filterSpecificRealationships({
				driver,
				...body,
			});
		case 'shortest-path':
			return shortestPath({ driver, ...body });
		default:
			break;
	}
}
