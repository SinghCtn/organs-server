export const dateFormat = (date: Date) => {
  return new Date(date).toISOString().split("T")[0];
};
