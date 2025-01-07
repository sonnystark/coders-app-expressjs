export const createChallenge = (req, res) => {
  res.send("Challenge created");
};
export const getAllChallenges = (req, res) => {
  res.send("List of challenges");
};
export const getChallengeById = (req, res) => {
  res.send(`Challenge details for ID: ${req.params.id}`);
};
export const getCategories = (req, res) => {
  res.send("List of categories");
};
