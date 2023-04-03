import https from 'https';
import axios from 'axios';
import JPNMOEIS from '../data/jpn.json' assert { type: 'json' };
import sekolahMOEIS from '../data/sekolah.json' assert { type: 'json' };
import singleSekolahMOEIS from '../data/singleSekolah.json' assert { type: 'json' };
import pelajarMOEIS from '../data/pelajar.json' assert { type: 'json' };
import singlePelajarMOEIS from '../data/singlePelajar.json' assert { type: 'json' };

// GET /jpn
const getJPNMOEIS = async (req, res) => {
  if (process.env.MOEIS_APIKEY) {
    console.log('query MOEIS JPN');
    try {
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      const { data } = await axios.get(process.env.MOEIS_INTEGRATION_URL_JPN, {
        httpsAgent: agent,
        headers: {
          APIKEY: process.env.MOEIS_APIKEY,
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(503).json({ msg: error.message });
    }
  } else {
    console.log('query local data JPN');
    res.status(200).json(JPNMOEIS);
  }
};

// GET /sekolah
const getSekolahMOEIS = async (req, res) => {
  const { jkod, katkod, pkod, opskod, stpm, jnskod, special } = req.query;

  if (process.env.MOEIS_APIKEY) {
    console.log('query MOEIS sekolah');
    const URLquery =
      process.env.MOEIS_INTEGRATION_URL_SEKOLAH +
      `?jkod=${jkod}` +
      `${jnskod ? `&jnskod=${jnskod}` : ''}`;
    try {
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      const { data } = await axios.get(URLquery, {
        httpsAgent: agent,
        headers: {
          APIKEY: process.env.MOEIS_APIKEY,
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(503).json({ msg: error.message });
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

// GET /singleSekolah
const getSingleSekolahMOEIS = async (req, res) => {
  const { inkod, inid } = req.query;

  if (process.env.MOEIS_APIKEY) {
    console.log('query MOEIS single sekolah');
    try {
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      const { data } = await axios.get(
        process.env.MOEIS_INTEGRATION_URL_SINGLE_SEKOLAH +
          `?inkod=${inkod}
          ${inid ? `&inid=${inid}` : ''}`,
        {
          httpsAgent: agent,
          headers: {
            APIKEY: process.env.MOEIS_APIKEY,
          },
        }
      );
      return res.status(200).json(data);
    } catch (error) {
      return res.status(503).json({ msg: error.message });
    }
  } else {
    console.log('query local data single sekolah');
    const singleSekolah = singleSekolahMOEIS.single_sekolah.filter((e) => {
      return e.KOD_INSTITUSI === inkod;
    });

    if (singleSekolah.length <= 0) {
      return res.status(404).json({ msg: 'No single sekolah found' });
    }

    const trueSingleSekolah = singleSekolah[0];

    res.status(200).json(trueSingleSekolah);
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
      return res.status(503).json({ msg: error.message });
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

// GET /singlePelajar
const getSinglePelajarMOEIS = async (req, res) => {
  const { id_individu } = req.query;

  if (process.env.MOEIS_APIKEY) {
    console.log('query MOEIS single pelajar');
    try {
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      const { data } = await axios.get(
        process.env.MOEIS_INTEGRATION_URL_SINGLE_PELAJAR +
          `?id_individu=${id_individu}`,
        {
          httpsAgent: agent,
          headers: {
            APIKEY: process.env.MOEIS_APIKEY,
          },
        }
      );
      return res.status(200).json(data);
    } catch (error) {
      return res.status(503).json({ msg: error.message });
    }
  } else {
    console.log('query local data single pelajar');
    const singlePelajar = singlePelajarMOEIS.single_pelajar.filter((e) => {
      return e.id_individu === id_individu;
    });

    if (singlePelajar.length <= 0) {
      return res.status(404).json({ msg: 'No single pelajar found' });
    }

    const trueSinglePelajar = singlePelajar[0];

    res.status(200).json(trueSinglePelajar);
  }
};

export {
  getJPNMOEIS,
  getSekolahMOEIS,
  getSingleSekolahMOEIS,
  getPelajarMOEIS,
  getSinglePelajarMOEIS,
};
