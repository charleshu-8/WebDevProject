import { createContext, Dispatch, SetStateAction } from "react";

// PFP state to be transferred
export interface ISignUpState {
  pfp: File | null;
  setPfp: Dispatch<SetStateAction<File | null>>;
}

// Context to transfer PFP state
export const SignUpContext = createContext<ISignUpState>({
  pfp: null,
  setPfp: () => {},
});
