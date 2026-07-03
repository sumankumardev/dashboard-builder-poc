import Widget from "../models/widget.model.js";

export class WidgetService {
  static async getAllWidgets() {
    return Widget.find();
  }

  static async getWidgetById(widgetId: string) {
    return Widget.findOne({
      widgetId,
    });
  }

  static async createWidget(payload: any) {
    return Widget.create(payload);
  }

  static async updateWidget(widgetId: string, payload: any) {
    return Widget.findOneAndUpdate({ widgetId }, payload, { new: true });
  }

  static async deleteWidget(widgetId: string) {
    return Widget.findOneAndDelete({
      widgetId,
    });
  }
}
