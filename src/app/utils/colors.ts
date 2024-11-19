  // function to randomize color background for profile pics
 export default function getRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  }