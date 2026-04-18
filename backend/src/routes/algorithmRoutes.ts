import { Router } from 'express';
import { getAlgorithms, runAlgorithm } from '../controllers/algorithmController';

const router = Router();

router.get('/algorithms', getAlgorithms);
router.post('/run', runAlgorithm);

export default router;
