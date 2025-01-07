import Challenge from "../modules/challenge.js";

export const getChallenges = async ({ category }) => {
  const query = category ? { category } : {};
  return await Challenge.find(query);
};

export const getChallengeById = async ({ id }) => {
  return await Challenge.findById(id);
};

export const getCategories = async () => {
  const categories = await Challenge.distinct("category");
  return categories.map((category) => ({ category }));
};
