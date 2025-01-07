import Submission from "../modules/submission.js";

export const getSolvedStats = async (userId) => {
  return await Submission.aggregate([
    {
      $match: { user_id: mongoose.Types.ObjectId(userId), status: "Completed" },
    },
    {
      $group: {
        _id: "$challenge_id.level",
        count: { $sum: 1 },
      },
    },
  ]);
};

export const getTrendingCategories = async () => {
  return await Submission.aggregate([
    { $match: { status: "Completed" } },
    {
      $lookup: {
        from: "challenges",
        localField: "challenge_id",
        foreignField: "_id",
        as: "challenge",
      },
    },
    { $unwind: "$challenge" },
    { $group: { _id: "$challenge.category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
};
