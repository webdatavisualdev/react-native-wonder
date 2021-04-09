import NavigatorService from '../../services/navigation';
import { select, call, put, takeEvery } from 'redux-saga/effects';
import { createAction, Action } from 'redux-actions';
import api from '../../services/api';
import { persistUser, persistAuth } from '../actions/user';



import { NavigationActions } from 'react-navigation';
import { Alert } from 'react-native';
import { resetRegistration } from '../reducers/registration';
import WonderAppState from '../../models/wonder-app-state';
import User from '../../models/user';
import UserCredentials from '../../models/user-credentials';
import ProfileImage from '../../models/profile-image';

export const REGISTER_USER = 'REGISTER_USER';
export const registerUser = createAction(REGISTER_USER);
export function* registerUserSaga(action: Action<any>) {
  try {
    const state: WonderAppState = yield select();

    const { data }: { data: User } = yield call(api, {
      method: 'POST',
      url: '/users',
      data: {
        user: state.registration
      }
    });

    const { email, password } = state.registration;
    yield put(loginUser({ email, password }));
  } catch (error) {
    if (error.response) {
      Alert.alert('ERROR', JSON.stringify(error.response.data));
    } else {
      console.warn(error);
    }
  } finally {
    // yield put(getUser());
  }
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerUserSaga);
}

export const LOGIN_USER = 'LOGIN_USER';
export const loginUser = createAction(LOGIN_USER);
export function* loginUserSaga(action: Action<UserCredentials>) {
  try {
    if (action.payload) {
      const { email, password } = action.payload;
      const response = yield call(api, {
        method: 'POST',
        url: '/user_tokens',
        data: {
          auth: {
            email,
            password
          }
        }
      });

      yield put(persistAuth(response.data));
      yield put(resetRegistration());
      NavigatorService.reset('Main', null);
    }
  } catch (error) {
    if (error.response) {
      Alert.alert('API Error', JSON.stringify(error.response.data));
    } else {
      console.warn(error);
    }
  } finally {

  }
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginUserSaga);
}

const LOGOUT_USER = 'LOGOUT_USER';
export const logoutUser = createAction(LOGOUT_USER);
export function* logoutUserSaga() {
  yield put(persistAuth({}));
  yield put(persistUser({}));
  NavigatorService.reset('Onboarding', null);
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logoutUserSaga);
}

const GET_USER = 'GET_USER';
export const getUser = createAction(GET_USER);
export function* getUserSaga(action: Action<any>) {
  try {
    const state: WonderAppState = yield select();
    const { auth } = state.user;

    const { data }: { data: User } = yield call(api, {
      method: 'GET',
      url: `/users/${auth.uid}`
    },
      state.user);

    yield put(persistUser(data));
  } catch (error) {
    if (error.response) {
      Alert.alert('API Error', JSON.stringify(error.response.data));
    } else {
      console.warn(error);
    }
  } finally {

  }
}

export function* watchGetUser() {
  yield takeEvery(GET_USER, getUserSaga);
}

const UPDATE_USER = 'UPDATE_USER';
export const updateUser = createAction(UPDATE_USER);
export function* updateUserSaga(action: Action<any>) {
  try {
    const state: WonderAppState = yield select();
    const { auth } = state.user;

    const profile: Partial<User> = action.payload;

    const { data }: { data: User } = yield call(api, {
      method: 'PUT',
      url: `/users/${auth.uid}`,
      data: {
        user: profile
      }
    }, state.user);

    yield put(persistUser(data));
  } catch (error) {
    if (error.response) {
      Alert.alert('API Error', JSON.stringify(error.response.data));
    } else {
      console.warn(error);
    }
  } finally {

  }
}

export function* watchUpdateUser() {
  yield takeEvery(UPDATE_USER, updateUserSaga);
}

const UPDATE_IMAGE = 'UPDATE_IMAGE';
export const updateImage = createAction(UPDATE_IMAGE);
export function* updateImageSaga(action: Action<any>) {
  try {
    const state: WonderAppState = yield select();
    const { auth } = state.user;
    const body = new FormData();
    const profile: Partial<any> = action.payload;
    const photo = {
      uri: profile.uri,
      type: 'image/jpeg',
      name: Date.now() + '.jpg',
    };
    body.append('image', photo);
    const { data }: { data: any } = yield call(api, {
      method: 'POST',
      url: `/users/${auth.uid}/images`,
      data: body
    }, state.user);
    yield put(getUser());
  } catch (error) {
    if (error.response) {
      Alert.alert('API Error', JSON.stringify(error.response.data));
    } else {
      console.warn(error);
    }
  } finally {

  }
}

export function* watchUpdateImage() {
  yield takeEvery(UPDATE_IMAGE, updateImageSaga);
}

const DELETE_PROFILE_IMAGE = 'DELETE_PROFILE_IMAGE';
export const deleteProfileImage = createAction(DELETE_PROFILE_IMAGE);
export function* deleteProfileImageSaga(action: Action<any>) {
  try {
    const asset: ProfileImage = action.payload;
    if (asset) {
      const state: WonderAppState = yield select();
      const { auth } = state.user;

      const { data }: { data: any } = yield call(api, {
        method: 'DELETE',
        url: `/users/${auth.uid}/images/${asset.id}`
      }, state.user);

      yield put(getUser());
    }
  } catch (error) {
    if (error.response) {
      Alert.alert('API Error', JSON.stringify(error.response.data));
    } else {
      console.warn(error);
    }
  } finally {

  }
}

export function* watchDeleteProfileImageSaga() {
  yield takeEvery(DELETE_PROFILE_IMAGE, deleteProfileImageSaga);
}

const DELETE_PROFILE_VIDEO = 'DELETE_PROFILE_VIDEO';
export const deleteProfileVideo = createAction(DELETE_PROFILE_VIDEO);
export function* deleteProfileVideoSaga(action: Action<any>) {
  try {
    const state: WonderAppState = yield select();
    const { auth } = state.user;

    const { data }: { data: any } = yield call(api, {
      method: 'DELETE',
      url: `/users/${auth.uid}/video`
    }, state.user);

    yield put(getUser());

  } catch (error) {
    if (error.response) {
      Alert.alert('API Error', JSON.stringify(error.response.data));
    } else {
      console.warn(error);
    }
  } finally {

  }
}

export function* watchDeleteProfileVideoSaga() {
  yield takeEvery(DELETE_PROFILE_VIDEO, deleteProfileVideoSaga);
}

const UPDATE_VIDEO = 'UPDATE_VIDEO';
export const updateVideo = createAction(UPDATE_VIDEO);
export function* updateVideoSaga(action: Action<any>) {
  try {
    const state: WonderAppState = yield select();
    const { auth } = state.user;
    const body = new FormData();
    const profile: Partial<any> = action.payload;
    const video = {
      uri: profile.uri,
      type: 'video/mp4',
      name: Date.now() + '.mp4',
    };
    body.append('video', video);
    const { data }: { data: any } = yield call(api, {
      method: 'POST',
      url: `/users/${auth.uid}/video`,
      data: body
    }, state.user);
    yield put(getUser());
  } catch (error) {
    if (error.response) {
      Alert.alert('API Error', JSON.stringify(error.response.data));
    } else {
      console.warn(error);
    }
  } finally {

  }
}

export function* watchUpdateVideo() {
  yield takeEvery(UPDATE_VIDEO, updateVideoSaga);
}
