import React, { useState, useEffect, useContext } from "react";
import { SignUpContext } from "./signUpContext";

export default function UploadAndDisplayImage() {
  // Define state variable to store the selected image
  const { pfp, setPfp } = useContext(SignUpContext);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Reference to the file input element
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Timeout ID for differentiating between single and double click
  let clickTimeout: NodeJS.Timeout | null = null;

  function handleClick() {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      clickTimeout = null;
      setPfp(null); // Handle double-click
    } else {
      clickTimeout = setTimeout(() => {
        clickTimeout = null;
        fileInputRef.current?.click(); // Handle single-click
      }, 300); // Adjust the delay as needed
    }
  }

  // Effect to detect dark mode preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div>
      {/* Conditionally render the selected image or the default image */}
      <div style={{ width: "100%" }}>
        {/* Set the width of the parent element */}
        <img
          alt="Profile"
          style={{
            width: "100%",
            cursor: "pointer",
            transform: pfp ? "scale(1.1)" : "none", // Apply zoom effect only to uploaded image
            transition: "transform 0.3s ease-in-out", // Smooth transition
          }}
          src={
            pfp
              ? URL.createObjectURL(pfp)
              : isDarkMode
                ? "/img/auth/default_pfp_dark.svg" // Use dark mode image
                : "/img/auth/default_pfp_light.svg" // Use light mode image
          }
          onClick={handleClick} // Handle both single and double click
        />
      </div>

      <br />
      {/* Input element to select an image file */}
      <input
        type="file"
        name="myImage"
        ref={fileInputRef} // Attach the ref to the input element
        style={{ display: "none" }} // Hide the input element
        // Event handler to capture file selection and update the state
        onChange={(event) => {
          const files = event.target.files;
          if (files && files.length > 0) {
            console.log("Valid file has been selected");
            setPfp(files[0]); // Update the state with the selected file
          } else {
            console.log("No file selected");
          }
        }}
      />
    </div>
  );
}
