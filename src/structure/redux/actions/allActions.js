export const addDownloadFileReducer = (obj) => {
  return {
    type: 'ADD_DOWNLOAD_FILE',
    payload: obj
  }
}

export const removeDownloadFileReducer = (obj) => {
  return {
    type: 'REMOVE_DOWNLOAD_FILE',
    payload: obj
  }
}
