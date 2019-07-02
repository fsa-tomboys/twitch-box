export const createUserMultistreamAssociation = (userId, multistreamId) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `/api/users/association/${userId}/${multistreamId}`
      )
      dispatch(updateUser(res.data))
    } catch (error) {
      console.log(
        'Error inside thunk method createUserMultistreamAssociation: ',
        error
      )
    }
  }
}
