import { Request, Response } from 'express';
import authService from '../../services/AuthService';

export default class AuthController {
// TODO: Probably there is no reason to have this method, but we need to discuss further more to be 100% sure;
//  async register(req: Request, res: Response): Promise<void> {
//    try {
//      const { email, password, role, classId } = req.body;
//      const token = await authService.register(email, password, role, classId);
//      res.status(201).json({ token });
//
//
//    } catch (error: any) {
//
//      if (error.message === 'User with this email already exists') {
//        res.status(409).json({ message: error.message });
//      } else {
//        res.status(400).json({ message: error.message });
//      }
//    }
//  }

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
