import { combineReducers } from 'redux'
import DownloadFileReducer from './download-file-reducer'

const allReducers = combineReducers({
  downloadFileReducer: DownloadFileReducer,
})

export default allReducers