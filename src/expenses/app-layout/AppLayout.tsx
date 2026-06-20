import { ReactNode } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { User } from "../../models/user";

type AppLayoutProps = {
  children: ReactNode;
  user: User;
};

function AppLayout({ children, user }: AppLayoutProps) {
  return (
    <div className="app-shell">
      <Sidebar {...user} />
      {children}
    </div>
  );
}

export default AppLayout;
