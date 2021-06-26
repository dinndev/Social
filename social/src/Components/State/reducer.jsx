export const initialState = {
  posts: [],
  currentUser: "",
};
const ACTION = {
  setPost: "SET_POST",
  deletePost: "DELETE_POST",
  clearDataAfterSignout: "CLEAR_DATA_AFTER_SIGNOUT",
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
    case ACTION.clearDataAfterSignout:
      state = undefined;

    default:
      return state;
  }
};

// const newUser = (email, password) => {
//   return { email, password };
// };
