export type UserRole = "VendorAdmin" | "VendorMobileSupervisor" | "VendorMobileSales" | "VendorSuperAdmin"; // Add other roles if needed

export interface Role {
  label: string;
  value: UserRole;
}

export const dashboardUserRoles: Role[] = [
  { label: "Vendor Super Admin", value: "VendorSuperAdmin" },
  { label: "Vendor Admin", value: "VendorAdmin" },
]
export const mobileUserRoles: Role[] = [
  { label: "Vendor Mobile Supervisor", value: "VendorMobileSupervisor" },
  { label: "Vendor Mobile Sales", value: "VendorMobileSales" },
];
