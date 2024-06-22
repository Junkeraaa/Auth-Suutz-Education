import { Request, Response } from 'express';
import authService from '../services/AuthService';

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, role } = req.body;
      const token = await authService.register(email, password, role);
      res.status(201).json({ token });
    } catch (error: any) {
      if (error.message === 'User with this email already exists') {
        res.status(409).json({ message: error.message }); // Codigo para mostrar conflito, pique usuario ja cadastrado entao toma
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new AuthController();
