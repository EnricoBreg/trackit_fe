import useAuthStore from "@/hooks/stores/useAuthStore";
import type React from "react";

interface PermissionGuardProps {
  permission: string;
  children: React.ReactNode;
}

const GlobalPermissionGuard = ({
  permission,
  children,
}: PermissionGuardProps) => {
  const permissions = useAuthStore((s) => s.userDetails?.globalPermissions);

  if (!permissions?.includes(permission)) return null;

  return <>{children}</>;
};

export default GlobalPermissionGuard;
