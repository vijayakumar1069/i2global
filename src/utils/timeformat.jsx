export const timeformat = (time) => {
  if (!time) return "Invalid date"; // Handle edge cases

  const dateObj = new Date(time); // Convert ISO string to Date object

  // Options for formatting (you can customize this)
  const options = {
    year: "numeric", // Full year (e.g., 2025)
    month: "long", // Full month name (e.g., February)
    day: "numeric", // Day of the month (e.g., 5)
    hour: "2-digit", // Hour in 2-digit format (e.g., 01)
    minute: "2-digit", // Minute in 2-digit format (e.g., 23)
    second: "2-digit", // Optional, add this for seconds
  };
 
  // Use `toLocaleString` for formatting
  return dateObj.toLocaleString("en-US", options);
};

