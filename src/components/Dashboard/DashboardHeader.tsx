import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { User, LogOut, CheckSquare } from "lucide-react";
import { useAuth } from "@/features/auth/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import { ModeToggle } from "../theme/mode-toggle";

interface DashboardHeaderProps {
  user: {
    username: string;
  };
}

export const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  return (
    <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {isMobile ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
                <CheckSquare className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
                <CheckSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">TaskFlow</h1>
                <p className="text-sm text-muted-foreground">
                  Manage your tasks
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{user?.username}</span>
            </div>
            {isMobile ? (
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
