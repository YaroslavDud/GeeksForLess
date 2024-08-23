import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  onSearch: (url: string) => void;
  onClick: () => void;
};

export default function SearchBar({ onSearch, onClick }: SearchBarProps) {
  return (
    <div className="flex items-center justify-center">
      <Input
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Enter GitHub repository URL"
      />
      <Button onClick={onClick} className="ml-4">
        Search
      </Button>
    </div>
  );
}
