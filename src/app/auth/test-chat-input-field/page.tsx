import ChatInputField from "./chat_input_form";
import MotionInputField from "./motion_input_form";

// Page for Testing Chat Input Field
export default function testingPage() {
  // Change href to point to actual signup page once implemented
  return (
    <div>
      {/* Background screen of test page */}
      <main className="flex h-screen w-screen flex-col items-center justify-center bg-red-200">
        {/* Container for chat input box */}
        <div className="mb-10 h-36 w-2/3">
          <ChatInputField />
        </div>
        {/* Container for motion input box */}
        <div className="mt-10 h-48 w-2/3">
          <MotionInputField />
        </div>
      </main>
    </div>
  );
}
