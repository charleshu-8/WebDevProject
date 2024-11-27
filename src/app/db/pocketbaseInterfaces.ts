export interface PocketbaseCommittee {
  collectionId: string;
  collectionName: string;
  id: string;
  title: string;
  members: string[];
  motions: string[];
  chair: string;
  created: string;
  updated: string;
}

export interface PocketbaseMotion {
  collectionId: string;
  collectionName: string;
  id: string;
  title: string;
  committee: string;
  messages: string[];
  created: string;
  updated: string;
  expand: { [key: string]: any };
}

export interface PocketbaseMessage {
  collectionId: string;
  collectionName: string;
  id: string;
  text: string;
  owner: string;
  motion: string;
  displayName: string;
  created: string;
  updated: string;
}
