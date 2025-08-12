import Book from "../../database/models/book.model.js";
import Transaction, { status } from "../../database/models/transaction.model.js";
import { roles } from "../../database/models/user.model.js";

export const borrowBook = async (req, res, next) => {
  try {
    const { bookId, numberOfCopies, returnDate, borrowDate } = req.body || {};

    const book = await Book.findById(bookId);
    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      throw error;
    }

    if (book.availableCopies < numberOfCopies) {
      const error = new Error("Not enough copies available");
      error.statusCode = 400;
      throw error;
    }

    book.availableCopies -= numberOfCopies;
    await book.save();

    const transaction = await Transaction.create({
      userId: req.user._id,
      bookId,
      numberOfCopies,
      borrowDate: borrowDate || new Date(),
      returnDate: returnDate || null,
      status: status.borrowed,
    });

    return res.status(201).json({
      message: "Book borrowed successfully",
      data: { transactionInfo: transaction },
    });
  } catch (error) {
    next(error);
  }
};

export const returnBook = async (req, res, next) => {
  try {
    const { bookId, numberOfCopies } = req.body || {};
    const { id } = req.params || {};

    const book = await Book.findById(bookId);
    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      throw error;
    }

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      const error = new Error("Transaction not found");
      error.statusCode = 404;
      throw error;
    }

    if (req.user._id.toString() !== transaction.userId.toString()) {
      const error = new Error("You are not allowed to return this book");
      error.statusCode = 403;
      throw error;
    }

    if (transaction.status === status.returned) {
      const error = new Error("Book already returned");
      error.statusCode = 400;
      throw error;
    }

    if (transaction.numberOfCopies < numberOfCopies) {
      const error = new Error(
        `${transaction.numberOfCopies} books are available to return but you are trying to return ${numberOfCopies} books.`
      );
      error.statusCode = 400;
      throw error;
    }

    book.availableCopies += numberOfCopies;

    if (transaction.numberOfCopies === numberOfCopies) {
      transaction.numberOfCopies = 0;
      transaction.status = status.returned;
    } else {
      transaction.numberOfCopies -= numberOfCopies;
    }

    transaction.returnDate = new Date();

    await book.save();
    await transaction.save();

    return res.status(200).json({
      message: "Book returned successfully",
      data: { transactionInfo: transaction },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id })
      .populate("bookId", "title author")
      .populate("userId", "name email");

    if (transactions.length === 0) {
      const error = new Error("No transactions found for this user");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      message: "Transactions retrieved successfully",
      data: { transactions },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTransactions = async (req, res, next) => {
  try {
    if (req.user.role !== roles.admin) {
      const error = new Error("You have to be an admin to perform this action.");
      error.statusCode = 403;
      throw error;
    }

    const { status: statusQuery } = req.query;
    let filter = {};
    if (statusQuery) filter.status = statusQuery;

    const transactions = await Transaction.find(filter)
      .sort({ borrowDate: 1 })
      .populate("bookId", "title author")
      .populate("userId", "name email");

    if (transactions.length === 0) {
      const error = new Error("No transactions found");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      message: "Transactions retrieved successfully",
      data: { transactions },
    });
  } catch (error) {
    next(error);
  }
};