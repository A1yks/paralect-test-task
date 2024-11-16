import 'dotenv/config';
import { z, parseEnv, port } from 'znv';

export default parseEnv(process.env, {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    PORT: port().optional().default(3001),
    MONGO_URI: z.string(),
    MONGO_DB_NAME: z.string(),
});
