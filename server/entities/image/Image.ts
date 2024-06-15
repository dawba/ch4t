import mongoose from "mongoose";

const { Schema, model } = mongoose;

const imageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ImageModel = model("Image", imageSchema);

export default ImageModel;
