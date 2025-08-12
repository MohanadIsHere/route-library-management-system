import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    availableCopies: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
    },
    optimisticConcurrency: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
