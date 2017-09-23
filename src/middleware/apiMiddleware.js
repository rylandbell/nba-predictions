export const apiMiddleware = ({ dispatch }) => next => action => {
  if (action.type !== 'API') {
    return next(action);
  }

  //dispatch a "pending" action if applicable
  action.payload.pending && dispatch({ type: action.payload.pending });

  const requestOptions = {
    method: action.payload.method,
    // mode: 'cors',
    credentials: 'same-origin',
    cache: 'default'
    // headers: {
    //   Authorization: 'Bearer ' + getState().auth.accessToken
    // }
  };

  if(action.payload.method !== 'GET'){
    requestOptions.headers = new Headers;
    requestOptions.headers.append('Content-Type', 'application/json');
  }

  if (action.payload.body) {
    requestOptions.body = JSON.stringify(action.payload.body);
  }

  const handleError = error => {
    error.json()
      .then(errorData => {
        dispatch({
          type: action.payload.failure,
          payload: errorData
        });
      })
      .catch(err => {console.log('middleware handleError function failed.', err)})
  }
    

  fetch(action.payload.url, requestOptions)
    .then(response => {
      if (response.status >= 300) {
        handleError(response);
      } else {
        response.json().then(responseData => {
          dispatch({
            type: action.payload.success,
            payload: responseData
          });
        });
      }
    })
    .catch(handleError);
};
