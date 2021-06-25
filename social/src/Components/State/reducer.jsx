export const initialState = {
  posts: [],
  currentUser: "",
};
const ACTION = {
  setPost: "SET_POST",
  deletePost: "DELETE_POST",
  getCurrentuser: "ADD_USER",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.setPost:
      return {
        ...state,
        posts: [
          ...state.posts,
          newPost(action.posts.body, action.posts.postId),
        ],
      };
    case ACTION.deletePost:
      return {
        ...state,
        posts: [...state.posts.filter((_, index) => index !== action.index)],
      };
    case ACTION.getCurrentuser:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    default:
      return state;
  }
};

const newPost = (body, postId) => {
  return { date: new Date().getTime(), body, postId };
};
// const newUser = (email, password) => {
//   return { email, password };
// };
