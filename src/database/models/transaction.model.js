import mongoose from "mongoose";
export const status = {
  borrowed: 'borrowed', returned: 'returned'
}
const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowDate: {
      type: Date,
      default: new Date(),
    },
    numberOfCopies: {
      type: Number,
      required: true,
    },
    returnDate: Date,
    status: {
      type: String,
      enum: Object.values(status),
      required: true,
    },
  },
  {
    timestamps: false,
    optimisticConcurrency: true,
  }
);
const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction