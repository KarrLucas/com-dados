import { Router } from "express";
import FileService from "../../services/fileService.js";

const route = Router();

export default (app) => {
    app.use('/file', route);

    route.post('/convert', async (req, res) => {
      console.time('CONVERT')
      const { base64, name } = req.body;
      const result = await FileService.convert(base64, name);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=teste.pdf');
      console.timeEnd('CONVERT')
      res.status(200).send(result);
    });
}