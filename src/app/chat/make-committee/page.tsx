import MakeCommitteeForm from "./form";

// Page for displaying the make-committee form while in development
export default function MakeCommittee() {
  return (
    <div>
      <main className="flex h-screen w-screen flex-col items-center justify-center bg-white">
        <h1>Testing</h1>
        <div className="h-fit w-4/5">
          <MakeCommitteeForm />
        </div>
      </main>
    </div>
  );
}
