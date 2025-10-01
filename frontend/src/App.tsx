import { useEffect, useState } from "react";
import { fetchIdeas, voteForIdea } from "./api/api";
import type { Idea } from "./types";
import styles from "./App.module.css";

function App() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [votingId, setVotingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadIdeas = async () => {
    try {
      const data = await fetchIdeas();
      setIdeas(data);
    } catch (err) {
      setError("Ошибка при загрузке идей");
      setTimeout(() => setError(null), 3000);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadIdeas().finally(() => setLoading(false));
  }, []);

  const handleVote = async (id: number) => {
    setVotingId(id);
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id ? { ...idea, votes: idea.votes + 1, voted: true } : idea
      )
    );

    try {
      await voteForIdea(id);
      await loadIdeas();
    } catch {
      setError("Ошибка при голосовании");
      setTimeout(() => setError(null), 3000);
      await loadIdeas();
    } finally {
      setVotingId(null);
    }
  };

  if (loading) {
    return (
      <div className={styles.center}>
        <div className={styles.spinner} />
        <p>Загружаем идеи...</p>
      </div>
    );
  }

  return (
    <>
      {error && <div className={styles.errorPopup}>{error}</div>}
      <div className={styles.container}>
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className={`${styles.card} ${idea.voted ? styles.cardVoted : ""}`}
          >
            <h2 className={styles.ideaTitle}>{idea.title}</h2>
            {idea.description && (
              <p className={styles.description}>{idea.description}</p>
            )}
            <p className={styles.votes}>Голоса: {idea.votes}</p>
            {!idea.voted ? (
              <button
                onClick={() => handleVote(idea.id)}
                disabled={votingId === idea.id}
                className={`${styles.button} ${
                  votingId === idea.id ? styles.buttonDisabled : ""
                }`}
              >
                {votingId === idea.id ? (
                  <>
                    <div className={styles.spinnerSmall} />
                    Голосуем...
                  </>
                ) : (
                  "Проголосовать"
                )}
              </button>
            ) : (
              <p style={{ color: "green", marginTop: "8px" }}>
                Вы уже голосовали
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
