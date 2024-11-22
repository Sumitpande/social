import mongoose, { Schema } from "mongoose";
import { IMessageType } from "../typings/index";

const MessageSchema: Schema = new Schema<IMessageType>(
    {
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        type: {
            type: String,
            enum: ["Text", "Media", "Document", "Link"],
        },

        text: {
            type: String,
        },
        file: {
            type: String,
        },
    },
    { timestamps: true },
);

export const MessageModel = mongoose.model<IMessageType>("Message", MessageSchema);
