import mongoose, { mongo } from "mongoose";

const contactUserSchema = new mongoose.Schema({
  Name: {
    required: true,
    type: String,
  },
  Age: {
    required: true,
    type: String,
  },
  Gender: {
    required: true,
    type: String,
  },
});
const contactUserModel= mongoose.models.contactusers || mongoose.model("contactusers", contactUserSchema);
export default contactUserModel;