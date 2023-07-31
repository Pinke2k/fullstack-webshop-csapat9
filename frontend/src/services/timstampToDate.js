export function timestampToDate(timestamp) {
    const date = new Date(timestamp); // Create a Date object using the timestamp
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    const dateString = `${year}-${month}-${day}`;
    return dateString;
  }
  