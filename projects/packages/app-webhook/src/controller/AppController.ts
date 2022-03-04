
import {NextFunction, Request, Response} from "express";
import { appRepo   } from '../repos'
import { randomBytes } from 'crypto'

export class AppController {

    private repo = appRepo();

    async all(request: Request, response: Response, next: NextFunction) {
        return this.repo.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const record = await this.repo.findOneByHash(request.params.id);

        if (record) {
            return record
        } else {
            response.status(404);
            response.json({ error: 'not found' })
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const body = request.body;
        body.hash = randomBytes(12).toString('hex');
        return this.repo.save(body);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const record = await this.repo.findOneByHash(request.params.id);
        if (record) {
            const body = request.body;
            if (body.hash) {
                delete body.hash;
            }

            return await this.repo.update(record.id, body);
        } else {
            response.status(404);
            response.json({ error: 'not found' });
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const record = await this.repo.findOneByHash(request.params.id);
        return await this.repo.softRemove(record);
    }
}