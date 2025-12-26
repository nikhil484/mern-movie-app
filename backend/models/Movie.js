import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    duration: Number,
    releaseDate: Date,
    poster: String,

    // ⭐ Ratings system
    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        value: {
          type: Number,
          min: 1,
          max: 10,
        },
      },
    ],

    avgRating: {
      type: Number,
      default: 0,
    },

    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
