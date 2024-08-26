import { Router } from 'express';
import AccountController from '../controllers/account/account.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const controller = new AccountController();

router.post('/loginAsStudent', async (req, res) => {
    try {
        const token = await controller.loginAsStudent(req.body.email, req.body.password);
        res.send({ token });
    } catch(e: any ) {

        res.status(401).send({ error: e.message });
    }
});

router.post('/loginAsTeacher', async (req, res) => {
    try {
        const token = await controller.loginAsTeacher(req.body.email, req.body.password);
        res.send({ token });
    } catch(e: any ) {
        res.status(401).send({ error: e.message });
    }
});

router.post('/registerStudent', async (req, res) => {
    try {
        const student = await controller.registerStudent({ email: req.body.email, name: req.body.name, password: req.body.password }, req as unknown as any);
        res.send({ data: student });
    } catch(e: any) {
        res.status(400).send({ error: e.message });
    }
});

router.post('/registerTeacher', async (req, res) => {
    try {
        const student = await controller.registerTeacher({ email: req.body.email, name: req.body.name, password: req.body.password, cpf: req.body.cpf }, req as unknown as any);
        res.send({ data: student });
    } catch(e: any) {
        res.status(400).send({ error: e.message });
    }
});

export default router;
