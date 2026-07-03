import mongoose, { Schema, Document,Model } from "mongoose";

export type WidgetType = "bar" | "line" | "treemap" | "scatter";

export interface IWidget extends Document {
  widgetId: string;

  title: string;

  type: WidgetType;

  dataSource: string;

  config: Record<string, unknown>;

  createdAt: Date;
  updatedAt: Date;
}

const WidgetSchema = new Schema<IWidget>(
  {
    widgetId: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["bar", "line", "treemap", "scatter"],
      required: true,
    },

    dataSource: {
      type: String,
      required: true,
    },

    config: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);
let Widget: Model<IWidget>;
try {
  Widget = mongoose.model<IWidget>("Widget");
} catch {
  Widget = mongoose.model<IWidget>("Widget", WidgetSchema);
}

export default Widget;
