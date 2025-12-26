import Movie from "../models/Movie.js";
import cloudinary from "../config/cloudinary.js";

export const getMovies = async (req, res) => {
  try {
    const {
      q,
      sortBy = "avgRating",
      order = "desc",
      releaseRange = "all",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};


    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }


    if (releaseRange && releaseRange !== "all") {
      const now = new Date();
      let fromDate = null;

      switch (releaseRange) {
        case "week":
          fromDate = new Date();
          fromDate.setDate(now.getDate() - 7);
          break;

        case "month":
          fromDate = new Date();
          fromDate.setMonth(now.getMonth() - 1);
          break;

        case "sixMonths":
          fromDate = new Date();
          fromDate.setMonth(now.getMonth() - 6);
          break;

        case "year":
          fromDate = new Date();
          fromDate.setFullYear(now.getFullYear() - 1);
          break;

        default:
          break;
      }

      if (fromDate) {
        filter.releaseDate = { $gte: fromDate };
      }
    }


    // const sortOptions = {
    //   [sortBy]: order === "asc" ? 1 : -1,
    // };

    const sortOptions = {};

    if (sortBy === "rating") {
      sortOptions.avgRating = order === "asc" ? 1 : -1;
    } else {
      sortOptions[sortBy] = order === "asc" ? 1 : -1;
    }


    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const skip = (pageNumber - 1) * pageSize;

    const totalMovies = await Movie.countDocuments(filter);

    const movies = await Movie.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    res.json({
      movies,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalMovies / pageSize),
      totalMovies,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const searchMovies = async (req, res) => {
  const { q } = req.query;
  const movies = await Movie.find({ $text: { $search: q } });
  res.json(movies);
};

// export const sortMovies = async (req, res) => {
//   const { by } = req.query;
//   const movies = await Movie.find().sort({ [by]: 1 });
//   res.json(movies);
// };

export const addMovie = async (req, res) => {
  try {
    let poster = "";


    console.log("FILE:", req.file);

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "movies",
      });
      poster = result.secure_url;
    }

    const movie = await Movie.create({
      title: req.body.title,
      description: req.body.description,
      rating: req.body.rating,
      releaseDate: req.body.releaseDate,
      duration: req.body.duration,
      poster,
    });

    res.status(201).json(movie);
  } catch (error) {
    console.error("ADD MOVIE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


export const updateMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(movie);
};

export const deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Movie deleted" });
};

export const rateMovie = async (req, res) => {
  try {
    const { value } = req.body;
    const userId = req.user.id;

    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }


    const alreadyRated = movie.ratings.find(
      (r) => r.user.toString() === userId
    );

    if (alreadyRated) {
      return res
        .status(400)
        .json({ message: "You can rate a movie only once" });
    }

    movie.ratings.push({ user: userId, value });


    movie.ratingCount = movie.ratings.length;
    movie.avgRating =
      movie.ratings.reduce((sum, r) => sum + r.value, 0) /
      movie.ratingCount;

    await movie.save();

    res.json({
      avgRating: movie.avgRating,
      ratingCount: movie.ratingCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
