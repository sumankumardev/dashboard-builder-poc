import { Request, Response } from "express";
import { mockEngine } from "../mocksEngine/index.js";

export class WidgetController {
  static async getBar(req: Request, res: Response) {
    res.json(mockEngine.bar());
  }

  static async getLine(req: Request, res: Response) {
    res.json(mockEngine.line());
  }

  static async getTreeMap(req: Request, res: Response) {
    res.json(mockEngine.treemap());
  }

  static async getScatter(req: Request, res: Response) {
    res.json(mockEngine.scatter());
  }
}
