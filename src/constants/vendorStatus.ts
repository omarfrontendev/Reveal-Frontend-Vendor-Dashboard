// src/constants/userStatus.ts

export type vendorStatus = "active" | "inactive" | "invited";

export interface Status {
  label: string;
  value: vendorStatus;
}

export const vendorStatus: Status[] = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Invaite", value: "invited" },
];
