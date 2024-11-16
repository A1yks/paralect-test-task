import * as JobApplicationsService from '@/services/jobApplications';
import { CreatedJobApplicationType, JobApplicationType } from '@shared/jobApplications/types';
import { IdParam, Pagination } from './types';

export async function create(req: Server.Request<JobApplicationType>, res: Server.Response) {
    const applicationData = req.body;
    const createdApplication = await JobApplicationsService.create(applicationData);

    res.status(201).json({ data: createdApplication });
}

export async function update(req: Server.Request<Partial<CreatedJobApplicationType>, IdParam>, res: Server.Response) {
    const { id } = req.params;
    const applicationData = req.body;
    const updatedApplication = await JobApplicationsService.update(id, applicationData);

    res.status(200).json({ data: updatedApplication });
}

export async function remove(req: Server.Request<void, IdParam>, res: Server.Response) {
    const { id } = req.params;

    await JobApplicationsService.remove(id);

    res.sendStatus(204);
}

export async function getMany(req: Server.Request<void, void, Pagination>, res: Server.Response) {
    const { page, pageSize } = req.query;
    const applicationsData = await JobApplicationsService.getMany(page, pageSize);

    res.status(200).json({ data: applicationsData });
}
