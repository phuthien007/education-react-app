/* eslint-disable */
import { StoreUtil } from '@/store/util';
import Axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
// import { useRefreshTokenHook } from './auth';

let isRefreshing = false;
// let refreshSubscribers = [];

// const subscribeTokenRefresh = (cb) => {
//   refreshSubscribers.push(cb);
// }

// const onRefreshed = (token) => {
//   refreshSubscribers.map(cb => cb(token));
// }

const AXIOS_INSTANCE = Axios.create({
  // baseURL: 'http://192.168.102.13:8080/services/',
  baseURL: 'https://gateway-dev.nexmo.vn/services/',
  paramsSerializer: (params: any) => {
    return qs.stringify(params, {
      skipNulls: true,
      arrayFormat: 'repeat',
      indices: false,
    });
  },
});

AXIOS_INSTANCE.interceptors.request.use(
  async config => {
    const accessToken = (await StoreUtil.getValue('token')) ?? null;
    //    store.get('accessToken')  store.get('tempAccessToken')
    const captchaResponse = '';
    //   store.get('captcha-response')
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    //   if (captchaResponse) {
    //     config.headers = {
    //       ...config.headers,
    //       'captcha-response': captchaResponse
    //     }
    //   }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

// AXIOS_INSTANCE.interceptors.response.use(undefined, error => {
//   const originalRequest = error.config;
//   if (((error.response && error.response.status === 401)  error.status === 401) && originalRequest.url !== "/auth/api/authenticate") {
//     if (!isRefreshing) {
//       console.log('refreshing for request', originalRequest.url)
//       isRefreshing = true;
//     //   store.remove('accessToken')

//       const refreshToken = store.get('refreshToken'), uuid = store.get('uuid')

//       if (refreshToken && uuid) {
//         useRefreshTokenHook()({ refreshToken, uuid }).then(({ accessToken }) => {
//           if (accessToken) {
//             store.set('accessToken', accessToken)
//             isRefreshing = false;
//             onRefreshed(accessToken);
//           }
//         }).catch((refreshError) => {
//           console.log('refreshError', refreshError);
//           isRefreshing = false;
//           // onRefreshed(null);

//           notification.error({
//             message: 'Lỗi',
//             description: 'Hết phiên đăng nhập, vui lòng đăng nhập lại',
//           })
//           console.log("redirect to login page");
//           store.clearAll()
//           // history.push('/auth/login')
//           location.reload()
//           return Promise.reject(error)
//         }).finally(() => {
//           refreshSubscribers = [];
//         });
//       } else {
//         isRefreshing = false;
//         store.clearAll()
//         console.log("redirect to login page");
//         // history.push('/auth/login')
//         location.reload()
//         return Promise.reject(error)
//       }
//     } else {
//       console.log("hang request until refreshed", originalRequest.url)
//     }

//     return new Promise((resolve, reject) => {
//       subscribeTokenRefresh(token => {
//         // replace the expired token and retry
//         if (token)
//           resolve(AXIOS_INSTANCE(originalRequest));
//         else
//           reject(error);
//       });
//     });
//   }

//   return Promise.reject(error);
// })

// add a second options argument here if you want to pass extra options to each generated query
export const customInstance = AXIOS_INSTANCE;

export const useCustomInstance = <T>(): ((
  config: AxiosRequestConfig,
) => Promise<T>) => {
  return (config: AxiosRequestConfig) => {
    const source = Axios.CancelToken.source();
    const promise = AXIOS_INSTANCE({
      ...config,
      cancelToken: source.token,
    }).then(({ data }) => data);

    // @ts-ignore
    promise.cancel = () => {
      source.cancel('Query was cancelled by React Query');
    };

    return promise;
  };
};

export default useCustomInstance;
