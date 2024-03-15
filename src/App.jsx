import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import MessageContext from "./components/MessageContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useContext } from "react";

const App = () => {
  const queryClient = useQueryClient();
  const [message, messageDispatch] = useContext(MessageContext);

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      messageDispatch({
        type: "NEW",
        payload: `Anecdote ${result.content} voted`,
      });
      setTimeout(() => {
        messageDispatch({
          type: "RESET",
        });
      }, 3000);
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification message={message} />

      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
