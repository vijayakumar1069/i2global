export const getTiming = () => {
    const time = new Date(); // Get current date and time
    const hours = time.getHours(); // Extract the hour (0-23)
  
    // Determine the greeting based on the hour
    if (hours >= 5 && hours < 12) {
      return "Good Morning";
    } else if (hours >= 12 && hours < 17) {
      return "Good Afternoon";
    } else if (hours >= 17 && hours < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };
  