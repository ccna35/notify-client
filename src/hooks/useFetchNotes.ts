import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../environment/env";

const useFetchNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getNotes = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_URL}/notes`, {
          withCredentials: true,
        });
        console.log(res);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getNotes();
  }, []);

  return { notes };
};

export default useFetchNotes;
