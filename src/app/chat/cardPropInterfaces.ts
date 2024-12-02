export interface CommitteeCardProps {
  committeeId: string;
  committeeTitle: string;
  committeeMemberCount?: string;
  onClick: () => void;
}

export interface MotionCardProps {
  motionTitle: string;
  motionStatus: string;
  shortName: string;
  fullName: string;
  motionText: string;
  seconderShortName: string;
  seconderFullName: string;
  time: string;
  key: string;
  onClick: () => void;
}
