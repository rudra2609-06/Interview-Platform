export const difficultyLevelBadge = (difficulty) => {
  console.log(difficulty.toLowerCase());
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "badge-success";

    case "medium":
      return "badge-warning";
    case "hard":
      return "badge-error";
    default:
      return "badge-ghost";
  }
};
