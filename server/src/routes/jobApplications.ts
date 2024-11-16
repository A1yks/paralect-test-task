import * as JobApplicationsController from '@/controllers/jobApplications';
import { createRecordReq, deleteRecordReq, getRecordsReq, updateRecordReq } from '@/controllers/jobApplications/validation';
import { validateRequest } from 'zod-express-middleware';
import { Router } from 'express';

const router = Router();

router.post('/', validateRequest(createRecordReq), JobApplicationsController.create);

router.patch('/:id', validateRequest(updateRecordReq), JobApplicationsController.update);

router.delete('/:id', validateRequest(deleteRecordReq), JobApplicationsController.remove);

router.get('/', validateRequest(getRecordsReq), JobApplicationsController.getMany);

export default router;
