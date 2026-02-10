import { HEADER_CONTENT } from '@/src/shared/lib/api/constant/header';

export type HeaderContentKey = keyof typeof HEADER_CONTENT;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type Params = Record<string, any>;
