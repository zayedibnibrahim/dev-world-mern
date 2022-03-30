import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { userLoginReducer, userRegisterReducer } from './reducers/authReducers'
import {
  addEducationReducer,
  addExperienceReducer,
  createProfileReducer,
  currentUserProfileReducer,
  deleteAccountReducer,
  deleteEducationReducer,
  deleteExperienceReducer,
} from './reducers/profileReducers'

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  currentUserProfile: currentUserProfileReducer,
  createProfile: createProfileReducer,
  addExperience: addExperienceReducer,
  addEducation: addEducationReducer,
  deleteExperience: deleteExperienceReducer,
  deleteEducation: deleteEducationReducer,
  deleteAccount: deleteAccountReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
