import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema({
  Username: {
    unique: true,
    required: true,
    type: String,
  },
  Blogs: [
    {
      Title: {
        required: true,
        type: String,
      },
      Text: {
        required: true,
        type: String,
      },
      Date: {
        Year: {
          required: true,
          type: Number,
        },
        Month: {
          required: true,
          type: Number,
        },
        Day: {
          required: true,
          type: Number,
        },
      },
      Likes: {
        required: true,
        type: Number, // Likes should be a number
      },
    },
  ],
});

const blogsModel =
  mongoose.models.posts || mongoose.model("posts", blogsSchema);

export default blogsModel;
