import "dotenv/config"
import { z } from 'zod';
const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url(),
  // NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  RATE_LIMIT: z.coerce.number().min(1)
});

const _env = envSchema.safeParse(process.env);
if (!_env.success) {
  const envKey = _env.error.issues[0]?.path[0];
  console.error(`Please Enter ${String(envKey)} Key in .env File`)
  // console.error("Please Enter all the env keys", envKey);
  process.exit(1);
}

export default _env;