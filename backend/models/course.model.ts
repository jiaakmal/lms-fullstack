import mongoose, { Document, Schema, Model } from "mongoose";
import { IUser } from "./user.model";
interface IComment {
  user: IUser;
  question: string;
  questionReplies: IComment[];
}

interface IReview {
  user: IUser;
  rating: number;
  comment: string;
  commentReplies: IComment[];
}
interface ILink {
  url: string;
  title: string;
}
interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestions: string;
  questions: IComment[];
}

export interface ICourse extends Document {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  preRequisites: { title: string }[];
  reviews: IReview[];
  courseData: ICourseData[];
  rating?: number;
  purchased: number; // Add the purchased field
}
const reviewSchema = new Schema<IReview>({
  user: Object,
  rating: { type: Number, default: 0 },
  comment: { type: String },
  commentReplies: [Object],
});
const   commentSchema = new Schema<IComment>({
  user: Object,
  question: { type: String },
  questionReplies: [Object],
});
const linkSchema = new Schema<ILink>({
  url: { type: String },
  title: { type: String },
});
const courseDataSchema = new Schema<ICourseData>({
  title: { type: String },
  description: { type: String },
  videoUrl: { type: String },
  videoSection: { type: String },
  videoLength: { type: Number },
  videoPlayer: { type: String },
  links: [linkSchema],
  suggestions: { type: String },
  questions: [commentSchema],
});
const courseSchema = new Schema<ICourse>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number },
  estimatedPrice: { type: Number },
  thumbnail: {
    public_id: { type: String},
    url: { type: String },
  },
  tags: { type: String, required: true },
  level: { type: String, required: true },
  demoUrl: { type: String, required: true },
  benefits: [{ title: String }],
  preRequisites: [{ title: String }],
  reviews: [reviewSchema],
  courseData: [courseDataSchema],
  rating: { type: Number, default: 0 },
  purchased: { type: Number, default: 0 }, // Initialize purchased with a default value
});

const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);
export default CourseModel;
