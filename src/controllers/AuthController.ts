import { Request, Response } from 'express';
import authService from '../services/AuthService';

class AuthController {
  async registerCustomer(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name } = req.body;
      const data = await authService.registerCustomer(email, password, name);
      console.log(data, "Customer criado com sucesso!")
      res.status(201).json({ data });
    } catch (error: any) {
      if (error.message === 'Customer with this email already exists') {
        res.status(409).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  }

  async loginCustomer(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const data = await authService.loginCustomer(email, password);
      res.status(200).json({ data });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async registerTeacher(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name } = req.body;
      const data = await authService.registerTeacher(email, password, name);
      res.status(201).json({ data });
    } catch (error: any) {
      if (error.message === 'Teacher with this email already exists') {
        res.status(409).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  }

  async loginTeacher(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const data = await authService.loginTeacher(email, password);
      res.status(200).json({ data });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new AuthController();
