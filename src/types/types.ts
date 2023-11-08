export type NoteType = {
  id: number;
  note_title: string;
  note_body: string;
  isPinned: number;
  category_name: string;
  createdAt: string;
  user_id: number;
};

export type CategoryType = {
  id: number;
  category_name: string;
  createdAt: string;
  user_id: number;
};
