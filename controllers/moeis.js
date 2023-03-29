import https from 'https';
import axios from 'axios';
import sekolahMOEIS from '../data/sekolah.json' assert { type: 'json' };
import pelajarMOEIS from '../data/pelajar.json' assert { type: 'json' };

// GET /sekolah
const getSekolahMOEIS = async (req, res) => {
  const { jkod, katkod, pkod, opskod, stpm, jnskod, special } = req.query;

  if (process.env.MOEIS_APIKEY) {
    console.log('query MOEIS sekolah');
    try {
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      const { data } = await axios.get(
        process.env.MOEIS_INTEGRATION_URL_SEKOLAH +
          `?jkod=${jkod}
          ${katkod ? `&katkod=${katkod}` : ''}${pkod ? `&pkod=${pkod}` : ''}${
            opskod ? `&opskod=${opskod}` : ''
          }${stpm ? `&stpm=${stpm}` : ''}${jnskod ? `&jnskod=${jnskod}` : ''}${
            special ? `&special=${special}` : ''
          }`,
        {
          httpsAgent: agent,
          headers: {
            APIKEY: process.env.MOEIS_APIKEY,
          },
        }
      );
      return res.status(200).json(data);
    } catch (error) {
      return res.json({ msg: error.message });
    }
  } else {
    console.log('query local data sekolah');
    const sekolahByNegeri = sekolahMOEIS.sekolah_by_negeri.filter((e) => {
      return e.NEGERI === jkod;
    });

    if (sekolahByNegeri.length <= 0) {
      return res.status(404).json({ msg: 'No sekolah found' });
    }

    const trueSekolahByNegeri = sekolahByNegeri[0];

    res.status(200).json(trueSekolahByNegeri);
  }
};

// GET /pelajar
const getPelajarMOEIS = async (req, res) => {
  const { inid, pkid, statusoku } = req.query;

  if (process.env.MOEIS_APIKEY) {
    console.log('query MOEIS pelajar');
    try {
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      const { data } = await axios.get(
        process.env.MOEIS_INTEGRATION_URL_PELAJAR +
          `?inid=${inid}
        ${pkid ? `&pkid=${pkid}` : ''}${
            statusoku ? `&statusoku=${statusoku}` : ''
          }`,
        {
          httpsAgent: agent,
          headers: {
            APIKEY: process.env.MOEIS_APIKEY,
          },
        }
      );
      return res.status(200).json(data);
    } catch (error) {
      return res.json({ msg: error.message });
    }
  } else {
    console.log('query local data pelajar');
    const pelajarByKelas = pelajarMOEIS.pelajar_by_kelas.filter((e) => {
      return e['ID Institusi'] === inid;
    });

    if (pelajarByKelas.length <= 0) {
      return res.status(404).json({ msg: 'No pelajar found' });
    }

    const truePelajarByKelas = pelajarByKelas[0];

    res.status(200).json(truePelajarByKelas);
  }
};

export { getSekolahMOEIS, getPelajarMOEIS };
