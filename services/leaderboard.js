import User from "../models/User";

export const getLeaderboard = async () => {
  return await User.find({ role: "coder" })
    .sort({ score: -1 })
    .select("username score solved_challenges");
};

export const getTopKCoders = async (k) => {
  return await User.find({ role: "coder" })
    .sort({ score: -1 })
    .limit(k)
    .select("username score");
};
