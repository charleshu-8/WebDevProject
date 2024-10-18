"use client";
import icon from "../../res/heart.svg"; // Adjust the path to your SVG file

// Form component for requesting email for password recovery
export default function ChatInputField() {
  // TODO:
  return (
    <>
      {/* Main White Chat Field Input Box Container */}
      <div
        className="h-64 w-3/4 flex-col items-center justify-center rounded-lg bg-white"
        style={{ overflow: "hidden" }}
      >
        {/* Gray Options Bar above chat input field */}
        <div
          className="bg-gray-shadow flex h-1/6 items-center pl-6"
          style={{ display: "flex", alignItems: "center" }}
        >
          {/* SVG Icon */}
          <img
            alt="Icon"
            style={{
              height: "80%",
              cursor: "pointer",
            }}
            src={icon.src} // Set the image source
          />
        </div>
      </div>
    </>
  );
}
