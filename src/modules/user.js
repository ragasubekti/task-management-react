const AUTHORIZATION = '@user/AUTHORIZATION'

const initialState = {
  isAuthorized: false,
  isManager: false,
  token: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

