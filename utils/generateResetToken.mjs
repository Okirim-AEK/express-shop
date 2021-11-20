import { randomBytes } from 'crypto';

export const randomString = ()=>randomBytes(20).toString('hex');