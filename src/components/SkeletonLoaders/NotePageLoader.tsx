const NotePageLoader = () => {
  return (
    <div className="flex-grow border-2 rounded-md dark:bg-slate-900 dark:border-slate-800">
      <div className="flex flex-col gap-4 animate-pulse items-start h-full justify-center p-4">
        <div className="w-full bg-gray-300 h-6 rounded-md dark:bg-slate-700 dark:border-slate-800"></div>
        <div className="w-full bg-gray-300 h-60 rounded-md dark:bg-slate-700 dark:border-slate-800"></div>
        <div className="w-3/4 bg-gray-300 h-6 rounded-md dark:bg-slate-700 dark:border-slate-800"></div>
        <div className="w-1/4 bg-gray-300 h-6 rounded-md dark:bg-slate-700 dark:border-slate-800"></div>
      </div>
    </div>
  );
};

export default NotePageLoader;
