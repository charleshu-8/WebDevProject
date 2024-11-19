import { Box } from "@mui/material";
import Image from 'next/image';

interface AvatarPicProps {
    avatarBackground:string;
    displayInitial?: string;
  }
  // custom component to display the avatar profile pic for members
  // or display their initial with random background if no avatar pic exists
  const AvatarPic = ({avatarBackground, displayInitial}: AvatarPicProps) => {
    // need this to get next/image component to register src path with HTTPS URL directly
    const customLoader = ({ src }: { src: string }) => {
      return src; // Use the HTTPS URL directly
    };
  
    // check if avatar exists for message owner
    // never should be empty
    if (avatarBackground !== "" && avatarBackground[0] !== "#") {
      return (
        <Image
          loader={customLoader}
          src={avatarBackground}
          className="flex h-6 w-6 items-center justify-center rounded-full"
          alt="user-avatar"
          width={600}
          height={600}
        />
      );
    } else {
      return (
        // default: show user's initial w color background
        <Box
          className="flex h-6 w-6 items-center justify-center rounded-full text-white"
          sx={{ backgroundColor: avatarBackground }}
        >
          {displayInitial}
        </Box>
      );
    }
  };

 export default AvatarPic;