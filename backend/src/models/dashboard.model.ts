import mongoose, { Schema, Document, type Model } from "mongoose";

export interface ILayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
}

export interface IDashboard extends Document {
  name: string;
  description?: string;

  widgets: mongoose.Types.ObjectId[];

  layouts: ILayout[];

  settings: {
    columns: number;
    rowHeight: number;
    compactType: "vertical" | "horizontal" | null;
  };

  createdAt: Date;
  updatedAt: Date;
}

const LayoutSchema = new Schema(
  {
    i: String,
    x: Number,
    y: Number,
    w: Number,
    h: Number,
    minW: Number,
    minH: Number,
  },
  { _id: false },
);

const DashboardSchema = new Schema<IDashboard>(
  {
    name: {
      type: String,
      required: true,
      default: "My Dashboard",
    },

    description: {
      type: String,
    },

    widgets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Widget",
      },
    ],

    layouts: [LayoutSchema],

    settings: {
      columns: {
        type: Number,
        default: 12,
      },

      rowHeight: {
        type: Number,
        default: 30,
      },

      compactType: {
        type: String,
        enum: ["vertical", "horizontal", null],
        default: "vertical",
      },
    },
  },
  {
    timestamps: true,
  },
);

let Dashboard: Model<IDashboard>;
try {
  Dashboard = mongoose.model<IDashboard>("Dashboard");
} catch {
  Dashboard = mongoose.model<IDashboard>("Dashboard", DashboardSchema);
}

export default Dashboard;
