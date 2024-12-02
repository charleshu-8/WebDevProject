import { CommitteeCardProps } from "../cardPropInterfaces";

export default function CommitteeCard({
  committeeId,
  committeeTitle,
  committeeMemberCount,
  onClick,
}: CommitteeCardProps) {
  return (
    <div
      key={committeeId}
      className={`relative w-full cursor-pointer rounded-lg bg-white p-4 shadow-md`}
      onClick={() => onClick()}
    >
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="truncate text-lg font-bold text-black">
          {committeeTitle}
        </h3>
        {committeeMemberCount !== undefined && (
          <span className="text-sm text-gray-500">
            {committeeMemberCount} Members
          </span>
        )}
      </div>
    </div>
  );
}
