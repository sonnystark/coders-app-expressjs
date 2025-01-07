export const getLeaderboard = (req, res) => {
  res.send("Leaderboard data");
};
export const getTopKCoders = (req, res) => {
  res.send(`Top ${req.query.k} coders`);
};
