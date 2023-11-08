import { NoteType } from "../../types/types";
import Note from "./Note";

type NotesContainerProps = {
  notes: NoteType[];
};

const NotesContainer = ({ notes }: NotesContainerProps) => {
  const allNotesFiltered = [
    ...notes.filter((note) => note.isPinned),
    ...notes.filter((note) => !note.isPinned),
  ];

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {allNotesFiltered.map((note: NoteType) => (
        <Note
          key={note.id}
          title={note.note_title}
          text={note.note_body}
          id={note.id}
          pinned={note.isPinned}
          createdAt={note.createdAt}
          category={note.category_name}
        />
      ))}
    </div>
  );
};

export default NotesContainer;
