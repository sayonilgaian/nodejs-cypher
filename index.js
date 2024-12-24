import e from 'express';
import cypherRouter from './routers/cypher.js';

const PORT = 8000;
const app = e();
app.use(e.json());
app.use(cypherRouter);

app.listen(PORT, () => {
	console.log('server running!');
});
