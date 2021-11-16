import {Observable, throwError, from} from 'rxjs';
import {
  mergeMap,
  retryWhen,
  take,
  delay,
  catchError,
  map,
} from 'rxjs/operators';
import axios, {AxiosPromise} from 'axios';
import iI8n from '../il8n';
import {ENV} from '../utils';
import UserService from './UserService';

async function handleRequest(req) {
  req.headers.userId = await UserService.getAuth();
  req.headers.Authorization = `Bearer ${await UserService.getAuthAccessToken()}`;
  req.headers.Accept = 'application/json';
  req.headers.language = iI8n.language;
  req.headers.timestamp = new Date().getTime();
  console.log({req});
  return req;
}

async function handleResponse(res) {
  console.log('InterResponse', res);
  if (res.status === 401 || (res.data && res.data.code === 401)) {
    await refresh();
  }
  return res;
}

/**
 * This is used to generate a new token for api calls
 * @returns {Promise<void>}
 */
async function refresh() {
  console.log('I was here to refreshToke');
  const userAccessToken = await UserService.getAuthAccessToken();
  console.log('newUserAccessToken', userAccessToken);
}

/**
 * This is used to manage errors from api calls by checking needed information
 * before responding to the caller.
 * @param err
 * @returns {Observable<never>}
 */
function errorHandler(err): Observable<any> {
  const message = iI8n.messages.errorEncountered;
  if (err && err.status === 0) {
    Object.assign(err.data, {message});
  }
  console.log('Error=', err);
  return throwError(err);
}

/**
 * This is used to modify the header request and relies on some header constraints
 * to generate some header fields
 */
axios.interceptors.request.use(
  async (req: any) => await handleRequest(req),
  (error) => Promise.reject(error),
);

/**
 * This is used to modify response call to reprocess error 401 and generate new
 * token to use for new and current running request.
 */
axios.interceptors.response.use(
  async (res) => await handleResponse(res),
  (err) => Promise.reject(err),
);

/**
 * This takes in a promise and convert to an observable
 * then makes the api request, it tries the api call 2 times only if failed
 * before responding to the caller.
 * @param apiCaller
 * @returns {Observable<*>}
 */
function processApiRequest(apiCaller: AxiosPromise<any>): Observable<any> {
  return from(apiCaller)
    .pipe(
      retryWhen((errors) =>
        errors.pipe(
          mergeMap((err) => errorHandler(err)),
          delay(1000),
          take(2),
        ),
      ),
      catchError((err) => errorHandler(err.response)),
      map((res) => res.data),
    )
    .toPromise();
}

/***
 * The ApiHandler framework with observable
 */
export default {
  post: async (url: string, data: any, options?: any) =>
    processApiRequest(
      axios.post(
        options?.isFullPath ? url : ENV.baseUrl + url,
        data,
        options && {headers: options},
      ),
    ),
  put: async (url: string, data: any, options?: any) =>
    processApiRequest(
      axios.put(
        options?.isFullPath ? url : ENV.baseUrl + url,
        data,
        options && {headers: options},
      ),
    ),
  delete: async (url: string, options?: any, data?: any) => {
    data = data
      ? data instanceof Object && !Object.keys(data).length
        ? null
        : data
      : null;
    const config = data
      ? {headers: options, data}
      : {headers: options, data: ''};
    return processApiRequest(
      axios.delete(options?.isFullPath ? url : ENV.baseUrl + url, config),
    );
  },
  get: async (url: string, options?: any, data?: any) => {
    data = data
      ? data instanceof Object && !Object.keys(data).length
        ? null
        : data
      : null;
    const config = data
      ? {headers: options, data}
      : {headers: options, data: ''};
    return processApiRequest(
      axios.get(options?.isFullPath ? url : ENV.baseUrl + url, config),
    );
  },
};
