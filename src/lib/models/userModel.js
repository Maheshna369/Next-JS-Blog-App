import mongoose from "mongoose";
// import { unique } from "next/dist/build/utils";
// import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "next/dist/shared/lib/constants";

const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    unique: true,
    required: true,
  },
  token: {
    type: String,
    unique: true,
    required: true
  }
});
const userModel = mongoose.models.users || mongoose.model("users", userSchema);
export default userModel;
