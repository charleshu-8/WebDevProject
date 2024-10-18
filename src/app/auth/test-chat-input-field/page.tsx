import ChatInputField from "./chat_input_form";

// Page for Testing Chat Input Field
export default function testingPage() {
  // Change href to point to actual signup page once implemented
  return (
    <div>
      <main className="flex h-screen w-screen flex-col items-center justify-center bg-red-200">
        <ChatInputField />
      </main>
    </div>
  );
}
