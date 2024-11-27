// Helper function to get initials from a full name
export function getInitials(name: string): string {
    const words = name.split(" ");
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };