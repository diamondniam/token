import { Navigate } from "react-router";

export default function PageRestricter({
  children,
  condition,
  navigateTo = "/",
}: {
  children: React.ReactNode;
  condition: boolean;
  navigateTo?: string;
}) {
  return condition ? <>{children}</> : <Navigate to={navigateTo} />;
}
