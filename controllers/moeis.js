const getSekolahMOEIS = async (req, res) => {
  // do sekolah
  res.status(200).json({ msg: 'get sekolah good' });
};

const getPelajarMOEIS = async (req, res) => {
  // do pelajar
  res.status(200).json({ msg: 'get pelajar good' });
};

export { getSekolahMOEIS, getPelajarMOEIS };
