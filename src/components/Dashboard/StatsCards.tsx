import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  counts: {
    all: number;
    todo: number;
    progress: number;
    done: number;
  };
}

export const StatsCards = ({ counts }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Card className="text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-foreground">{counts.all}</div>
          <div className="text-sm text-muted-foreground">Total Tasks</div>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-status-todo">{counts.todo}</div>
          <div className="text-sm text-muted-foreground">To Do</div>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-orange-600">{counts.progress}</div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-green-600">{counts.done}</div>
          <div className="text-sm text-muted-foreground">Done</div>
        </CardContent>
      </Card>
    </div>
  );
};