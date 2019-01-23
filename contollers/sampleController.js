const sample = (req, res) => {
  return res.json({
    msg: 'ok',
    random: Math.random(),
    date: new Date()
  });
};

module.exports = { sample };