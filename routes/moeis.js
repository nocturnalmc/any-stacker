import express from 'express';
import {
  getJPNMOEIS,
  getSekolahMOEIS,
  getSingleSekolahMOEIS,
  getPelajarMOEIS,
  getSinglePelajarMOEIS,
} from '../controllers/moeis.js';

const router = express.Router();

router.route('/jpn').get(getJPNMOEIS);
router.route('/sekolah').get(getSekolahMOEIS);
router.route('/singleSekolah').get(getSingleSekolahMOEIS);
router.route('/pelajar').get(getPelajarMOEIS);
router.route('/singlePelajar').get(getSinglePelajarMOEIS);

export default router;
