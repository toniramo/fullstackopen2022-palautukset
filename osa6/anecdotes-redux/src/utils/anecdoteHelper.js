export const orderByVotes = (anecdotes) => {
  return anecdotes.sort((a, b) =>  a.votes > b.votes ? -1 : 1)
}