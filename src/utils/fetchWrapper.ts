import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError
} from '../types/errorTypes';

const methods = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE'
} as const;
export type Method = (typeof methods)[keyof typeof methods];
type RequestInfo = string;

export async function handleResponse<TData>(
  response: Response
): Promise<TData> {
  if (response.status === 401) {
    const loginPath = '/login';
    if (window.location.pathname !== loginPath) {
      window.location.href = loginPath;
    }

    const error = new UnauthorizedError();
    throw error;
  }

  if (response.status === 204) {
    return {} as TData;
  }

  const res = await response.json();

  if (response.status === 400) {
    throw new BadRequestError(res.message);
  }

  if (response.status === 403) {
    throw new ForbiddenError(res.message);
  }

  if (response.status === 404) {
    throw new NotFoundError(res.message);
  }

  if (response.status < 200 || response.status >= 300) {
    throw new Error(
      `There has been an error. Response status: ${response.status}`
    );
  }

  return res;
}

function isMethod(str: string): str is Method {
  return methods.hasOwnProperty(str);
}

function _getMethod(arg1: Method | RequestInfo, url?: RequestInfo): Method {
  if (isMethod(arg1)) {
    return arg1;
  }

  if (typeof arg1 === 'string' && !url) {
    return methods.GET;
  }

  throw new Error(`${arg1} must be a valid method`);
}

export async function fetchWrapper<TData, TBody = unknown>(
  arg1: Method | RequestInfo,
  url?: RequestInfo,
  body?: TBody,
  additionalOptions?: any
): Promise<TData> {
  // if called with one argument, default to 'GET' method
  const _method = _getMethod(arg1, url);
  // if called without method arg, the first
  const _url = url || arg1;

  const options = {
    method: _method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache'
    },
    credentials: 'include',
    body: body && JSON.stringify(body), // body can be undefined, that's ok
    ...additionalOptions
  };

  const response = await fetch(_url, options);
  return await handleResponse<TData>(response);
}
