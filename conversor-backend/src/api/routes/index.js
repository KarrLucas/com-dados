import { Router } from 'express';
import fileRoutes from './fileRoutes.js';

export default () => {
	const router = Router();

	fileRoutes(router);
	return router;
}

