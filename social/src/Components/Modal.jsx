import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Styles/Sass/modal.module.scss";
import { useDataContext } from "./State/DataProvider";
import { database } from "./helperFunctions";

function Modal({ modal, toggleModal, postId }) {
  const { reducer, user } = useDataContext();
  const [{ posts }, dispatch] = reducer;
  const deletePost = () => {
    dispatch({
      type: "DELETE_POST",
      postId,
    });
    database.ref(`posts/${user.uId}/${postId}`).remove();
    toggleModal(postId);
  };

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.modalContainer}
        >
          <h2>Options</h2>
          <div className={styles.options}>
            <span className={styles.edit}>Edit</span>
            <span onClick={deletePost} className={styles.delete}>
              Delete
            </span>
            <button onClick={(_) => toggleModal()}>X</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
