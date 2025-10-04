import { useEffect, useState } from "react";
import { createDiary, getAllDiaries } from "./services/diary";
import type { NewDiary, Diary } from "./types";
import axios from "axios";

const App = () => {
  const [error, setError] = useState<string | null>(null);
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiary>({
    date: "",
    weather: "sunny",
    visibility: "great",
    comment: "",
  });

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const notify = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const response = await createDiary(newDiary);
      setDiaries(diaries.concat(response));
    } catch (error) {
      let message = "unknown error";
      if (axios.isAxiosError(error)) {
        message = error.response?.data as string;
      } else {
        message = "An unexpected error occurred";
      }
      notify(message);
    }
    setNewDiary({
      date: "",
      weather: "sunny",
      visibility: "great",
      comment: "",
    });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      <form
        onSubmit={diaryCreation}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
          gap: 10,
        }}
      >
        <label>
          date
          <input
            type="date"
            value={newDiary.date}
            onChange={(e) => setNewDiary({ ...newDiary, date: e.target.value })}
          />
        </label>
        <div>
          <span>visibility: </span>
          {["great", "good", "ok", "poor"].map((v) => (
            <label key={v} style={{ marginRight: 10 }}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={newDiary.visibility === v}
                onChange={() =>
                  setNewDiary({
                    ...newDiary,
                    visibility: v as NewDiary["visibility"],
                  })
                }
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          <span>weather: </span>
          {["sunny", "rainy", "cloudy", "stormy", "windy"].map((w) => (
            <label key={w} style={{ marginRight: 10 }}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={newDiary.weather === w}
                onChange={() =>
                  setNewDiary({
                    ...newDiary,
                    weather: w as NewDiary["weather"],
                  })
                }
              />
              {w}
            </label>
          ))}
        </div>
        <label>
          comment
          <input
            value={newDiary.comment}
            onChange={(e) =>
              setNewDiary({ ...newDiary, comment: e.target.value })
            }
          />
        </label>
        <button type="submit">add</button>
      </form>
      <h2>Diary Entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
          <p>comment: {diary.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
