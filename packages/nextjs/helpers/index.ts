export const truncateDescription = (text: string, maxWords: number): string => {
    // Regular expression to match words and special characters
    const wordPattern = /[a-zA-Z0-9]+/g;
    const words = text.match(wordPattern); // Find all words and special characters
    if (words && words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }

    return text;
  };