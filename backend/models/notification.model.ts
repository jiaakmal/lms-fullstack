import mongoose, { Document, Model, Schema } from "mongoose";

interface INotification {
    userId: string;
    title: string;
    message: string;
    status: string;
}

interface INotificationDocument extends INotification, Document {}
 const NotificationSchema: Schema = new Schema<INotification>({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, required: true, enum: ['unread', 'read'] , default: 'unread' }
 },
{
    timestamps: true
});
const NotificationModel: Model<INotificationDocument> = mongoose.model<INotificationDocument>("Notification", NotificationSchema);
export default NotificationModel;