import { Box } from "@mui/material";
import Image from "next/image";

interface UserAvatarProps {
  avatarBackground: string;
  displayInitial?: string;
}

// Display avatar PFP for committee members
// If PFP not found, display their initials with a random background color
export default function UserAvatar({
  avatarBackground,
  displayInitial: displayInitial,
}: UserAvatarProps) {
  // Use Next Image component to register src path with HTTPS URL directly
  function customLoader({ src }: { src: string }) {
    return src;
  }

  // Check if avatar exists for message owner
  // Should never be empty
  if (avatarBackground !== "" && avatarBackground[0] !== "#") {
    return (
      <Image
        loader={customLoader}
        src={avatarBackground}
        className="flex h-6 w-6 items-center justify-center rounded-full"
        alt="User avatar"
        width={600}
        height={600}
      />
    );
  } else {
    // Default: Show user's initials with some background color
    return (
      <Box
        className="flex h-6 w-6 items-center justify-center rounded-full text-white"
        sx={{ backgroundColor: avatarBackground }}
      >
        {displayInitial}
      </Box>
    );
  }
}
