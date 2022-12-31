import editCommentStore from "../stores/editCommentStore";

const useEditingComment = () => {
  const editingComments = editCommentStore((state) => state.editingComments);
  const editComment = editCommentStore((state) => state.editComment);
  const stopEditingComment = editCommentStore(
    (state) => state.stopEditingComment
  );

  const isCommentBeingEdited = (commentId: string) =>
    editingComments[commentId] || false;

  return { isCommentBeingEdited, editComment, stopEditingComment };
};

export default useEditingComment;
