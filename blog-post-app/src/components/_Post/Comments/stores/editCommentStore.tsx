import create from "zustand";

interface EditCommentState {
  editingComments: Record<string, boolean>;
  editComment: (commentId: string) => void;
  stopEditingComment: (commentId: string) => void;
}

const editCommentStore = create<EditCommentState>((set) => ({
  editingComments: {},
  editComment: (commentId: string) =>
    set((state) => ({
      editingComments: {
        ...state.editingComments,
        [commentId]: true,
      },
    })),
  stopEditingComment: (commentId: string) =>
    set((state) => ({
      editingComments: {
        ...state.editingComments,
        [commentId]: false,
      },
    })),
}));

export default editCommentStore;
