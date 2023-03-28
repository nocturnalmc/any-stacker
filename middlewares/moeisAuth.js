const moeisAuth = async (req, res, next) => {
  const apikey = req.headers.apikey;
  if (!apikey || apikey !== process.env.OWN_MIDDLEWARE_MOEIS_APIKEY) {
    return res.status(404).json({ msg: 'Unauthorized' });
  }
  if (apikey === process.env.OWN_MIDDLEWARE_MOEIS_APIKEY) {
    next();
  }
};

export default moeisAuth;
