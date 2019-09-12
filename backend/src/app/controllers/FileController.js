import File from '../models/File';

class FileController {
  async store(req, res, next) {
    try {
      const { originalname: name, filename: path } = req.file;

      const file = await File.create({
        name,
        path,
      });

      return res.json(file);
    } catch (error) {
      return next(error);
    }
  }
}

export default new FileController();
