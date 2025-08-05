import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  setStatusFilter,
  setSearch,
  type StatusFilter,
} from "@/features/filters/filterSlice";

interface TaskFiltersProps {
  onOpenCreateDialog: () => void;
}

export const TaskFilters = ({ onOpenCreateDialog }: TaskFiltersProps) => {
  const dispatch = useAppDispatch();
  const filterState = useAppSelector((s) => s.filter);

  const onSearchChange = (val: string) => {
    dispatch(setSearch(val));
  };

  const onStatusChange = (val: string) => {
    dispatch(setStatusFilter(val as StatusFilter));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={filterState.search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      <Select value={filterState.status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-48 p-6">
          <div className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tasks</SelectItem>
          <SelectItem value="todo">To Do</SelectItem>
          <SelectItem value="progress">In Progress</SelectItem>
          <SelectItem value="done">Done</SelectItem>
        </SelectContent>
      </Select>

      <Button className="h-12 px-6 btn-primary" onClick={onOpenCreateDialog}>
        <Plus className="w-4 h-4 mr-2" />
        New Task
      </Button>
    </div>
  );
};
