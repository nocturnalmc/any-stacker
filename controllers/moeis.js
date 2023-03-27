import sekolahMOEIS from '../data/sekolah.json' assert { type: 'json' };
import pelajarMOEIS from '../data/pelajar.json' assert { type: 'json' };

const getSekolahMOEIS = async (req, res) => {
  const { jkod, katkod } = req.query;

  const sekolahByNegeri = sekolahMOEIS.sekolah_by_negeri.filter((e) => {
    return e.NEGERI === jkod;
  });

  if (sekolahByNegeri.length <= 0) {
    return res.status(404).json({ msg: 'No sekolah found' });
  }

  res.status(200).json(sekolahByNegeri);
};

const getPelajarMOEIS = async (req, res) => {
  const { inid, pkid } = req.query;

  const pelajarByKelas = pelajarMOEIS.pelajar_by_kelas.filter((e) => {
    return e['ID Institusi'] === inid;
  });

  if (pelajarByKelas.length <= 0) {
    return res.status(404).json({ msg: 'No pelajar found' });
  }

  res.status(200).json(pelajarByKelas);
};

export { getSekolahMOEIS, getPelajarMOEIS };
