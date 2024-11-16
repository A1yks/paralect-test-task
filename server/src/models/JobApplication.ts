import { applicationStatuses } from '@shared/jobApplications/schema';
import { CreatedJobApplicationType } from '@shared/jobApplications/types';
import { model, Schema } from 'mongoose';

const jobApplicationSchema = new Schema<CreatedJobApplicationType>(
    {
        company: { type: String, required: true },
        position: { type: String, required: true },
        salaryFrom: { type: Number, required: true },
        salaryTo: { type: Number, required: true },
        status: { type: String, enum: applicationStatuses, required: true },
        note: { type: String, required: false },
    },
    {
        timestamps: true,
    },
);

export default model<CreatedJobApplicationType>('JobApplication', jobApplicationSchema, 'job-applications');
