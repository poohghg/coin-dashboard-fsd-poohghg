export const HEADER_CONTENT = {
  string: 'text/plain;charset=UTF-8',
  json: 'application/json',
  form: 'multipart/form-data',
  xForm: 'application/x-www-form-urlencoded',
} as const;

export const HEADER = {
  CONTENT_TYPE: 'Content-Type',
  X_REAL_IP: 'X-Real-Ip',
  USER_AGENT: 'User-Agent',
} as const;
