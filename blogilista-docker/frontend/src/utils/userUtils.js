const setNewUser = (user, setUser) => {
  setUser(user)
  window.localStorage.setItem('user', JSON.stringify(user))
}

const fetchUser = () => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  return user
}

const logout = (setUser) => {
  window.localStorage.removeItem('user')
  setUser(null)
}


export default {setNewUser, fetchUser, logout}