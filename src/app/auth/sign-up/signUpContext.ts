import { createContext, Dispatch, SetStateAction } from "react";

// PFP state to be transferred
interface SignUpState {
  pfp: File | null;
  setPfp: Dispatch<SetStateAction<File | null>>;
}

// Context to transfer PFP state
export const SignUpContext = createContext<SignUpState>({
  pfp: null,
  setPfp: () => {},
});
