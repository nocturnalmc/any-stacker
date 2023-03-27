import express from 'express';
import { getSekolahMOEIS, getPelajarMOEIS } from '../controllers/moeis.js';

const router = express.Router();

router.route('/sekolah').get(getSekolahMOEIS);
router.route('/pelajar').get(getPelajarMOEIS);

export default router;
