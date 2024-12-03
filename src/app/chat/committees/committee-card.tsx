import { CommitteeCardProps } from "../cardPropInterfaces";

export default function CommitteeCard(props: CommitteeCardProps) {
  return (
    <div
      key={props.committeeId}
      className={`relative w-full cursor-pointer rounded-lg bg-white p-4 shadow-md ${props.selectedCommittee == props.committeeId ? "rounded-[7px] border-[6px] border-blue-500" : "hover:bg-extra-dim-gray"}`}
      onClick={() => props.onClick()}
    >
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="truncate text-lg font-bold text-black">
          {props.committeeTitle}
        </h3>
        {/* Member count */}
        {props.committeeMemberCount !== undefined && (
          <span className="text-sm text-gray-500">
            {props.committeeMemberCount} Members
          </span>
        )}
      </div>
    </div>
  );
}
