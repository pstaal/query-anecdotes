import { createAnecdote } from "../requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import MessageContext from "./MessageContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [message, messageDispatch] = useContext(MessageContext);
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      messageDispatch({
        type: "NEW",
        payload: `Anecdote ${newAnecdote.content} added`,
      });
      setTimeout(() => {
        messageDispatch({
          type: "RESET",
        });
      }, 3000);
    },
    onError: (error) => {
      messageDispatch({
        type: "NEW",
        payload: `Anecdote ${error.message} added`,
      });
      setTimeout(() => {
        messageDispatch({
          type: "RESET",
        });
      }, 3000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
