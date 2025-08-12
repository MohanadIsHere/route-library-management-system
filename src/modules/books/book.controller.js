import Book from "../../database/models/book.model.js";
import { roles } from "../../database/models/user.model.js";

export const createBook = async (req, res, next) => {
  try {
    if (req?.user?.role !== roles.admin) {
      const error = new Error("You must be an admin to create a book");
      error.statusCode = 403;
      throw error;
    }

    const book = await Book.create({ ...req.body });

    return res.status(201).json({
      message: "Book created successfully",
      data: { book },
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const { title, author, publishedYear, availableCopies } = req?.body || {};
    const { id } = req?.params;

    if (req?.user?.role !== roles.admin) {
      const error = new Error("You must be an admin to update a book");
      error.statusCode = 403;
      throw error;
    }

    let book = await Book.findById(id);
    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      throw error;
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.publishedYear = publishedYear || book.publishedYear;
    book.availableCopies = availableCopies || book.availableCopies;

    await book.save();

    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const { id } = req?.params;

    if (req?.user?.role !== roles.admin) {
      const error = new Error("You must be an admin to delete a book");
      error.statusCode = 403;
      throw error;
    }

    let book = await Book.deleteOne({ _id: id });
    if (book.deletedCount === 0) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const searchBook = async (req, res, next) => {
  try {
    const { q } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const filter = q
      ? {
          $or: [
            { title: { $regex: q, $options: "i" } },
            { author: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const skip = (page - 1) * limit;

    const books = await Book.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (!books.length) {
      const error = new Error("No books found");
      error.statusCode = 404;
      throw error;
    }

    const total = await Book.countDocuments(filter);

    return res.status(200).json({
      message: "Books retrieved successfully",
      total,
      page,
      limit,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};