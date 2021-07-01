export const initialState = {
  posts: [],
  currentUser: "",
  isLoading: false,
};
const ACTION = {
  setPost: "SET_POST",
  deletePost: "DELETE_POST",
  clearDataAfterSignout: "CLEAR_DATA_AFTER_SIGNOUT",
  toggleLoading: "TOGGLE_LOADING",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.setPost:
      return {
        ...state,
        posts: action.posts,
      };
    case ACTION.deletePost:
      return {
        ...state,
        posts: [
          ...state.posts.filter(({ postId }) => postId !== action.postId),
        ],
      };
    case ACTION.toggleLoading:
      return { ...state, isLoading: action.loading };
    default:
      return state;
  }
};

// const newUser = (email, password) => {
//   return { email, password };
// };
