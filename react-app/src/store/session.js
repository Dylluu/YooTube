// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const GET_USERS = 'session/GET_USERS';
const GET_LIKES = 'session/GET_LIKES';

const getLikes = (payload) => ({
  type: GET_LIKES,
  payload
})

export const getLikesThunk = () => async (dispatch) => {
  const response = await fetch('/api/users/likes');

  if(response.ok) {
    const data = await response.json()
    dispatch(getLikes(data))
  }
}

export const getUsersThunk = () => async (dispatch) => {
  const response = await fetch ('/api/users');

  if(response.ok) {
    const data = await response.json()
    dispatch(getUsers(data))
  }
}

const getUsers = (payload) => ({
  type: GET_USERS,
  payload
})

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (first_name, last_name, username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name,
      last_name,
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export default function reducer(state = initialState, action) {
  const newState = {...state}

  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      newState.user = null
      return newState
    case GET_USERS:
      newState.allUsers = action.payload.users
      return newState
    case GET_LIKES:
      newState.allLikes = action.payload
      return newState
    default:
      return state;
  }
}
