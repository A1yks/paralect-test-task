import APIError from '@/errors/APIError';
import JobApplication from '@/models/JobApplication';
import { JobApplicationType } from '@shared/jobApplications/types';

export async function create(applicationData: JobApplicationType) {
    return await JobApplication.create(applicationData);
}

export async function update(id: string, applicationData: Partial<JobApplicationType>) {
    const application = await getOne(id);

    Object.assign(application, applicationData);

    await application.save();

    return application;
}

export async function remove(id: string) {
    const application = await getOne(id);

    await application.deleteOne();
}

export async function getMany(page: number, pageSize = 10) {
    const [applications, amount] = await Promise.all([
        JobApplication.find()
            .sort({ createdAt: 1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize),
        JobApplication.countDocuments(),
    ]);

    return { applications, amount };
}

async function getOne(id: string) {
    const application = await JobApplication.findOne({ _id: id });

    if (!application) {
        throw new APIError('Отклик не найден', 404);
    }

    return application;
}
