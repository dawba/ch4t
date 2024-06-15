import mongoose from "mongoose";

interface ImageDocument extends mongoose.Document {
  name: string;
  data: Buffer;
  contentType: string;
  createdAt: Date;
}

export default ImageDocument;
