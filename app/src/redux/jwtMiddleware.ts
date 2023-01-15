import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import {
  authLogout,
  authRefreshing,
  authSessionExpired,
  authUpdateTokens,
} from './slices/auth/authSlice';

export default jwt = ({dispatch, getState}: {dispatch: any; getState: any}) => {
  return (next: any) => (action: any) => {
    // only worry about expiring token for async actions
    if (typeof action === 'function') {
      if (getState().auth && getState().auth.authenticated) {
        const user: any = jwt_decode(getState().auth.access_token);
        const isExpired: boolean = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if (isExpired) {
          if (!getState().auth.refreshTokenPromise) {
            return refreshToken(getState().auth.refresh_token, dispatch).then(
              () => next(action),
            );
          } else {
            return getState().auth.refreshTokenPromise.then(() => next(action));
          }
        }
      }
    }
    return next(action);
  };
};

export function refreshToken(refreshToken: string, dispatch) {
  var freshTokenPromise = axios
    .post(`http://localhost:3000/auth/refresh`, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .then(t => {
      t.data
        ? dispatch(authUpdateTokens(t.data))
        : dispatch(authSessionExpired());
      return t.data
        ? Promise.resolve(t.data)
        : Promise.reject({
            message: 'could not refresh token',
          });
    })
    .catch(e => {
      console.log('error refreshing token', e);
      dispatch(authSessionExpired());
      return Promise.reject(e);
    });

  dispatch(authRefreshing(freshTokenPromise));

  return freshTokenPromise;
}
