import { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";

type FilterBarProps = {
  setStatus: Dispatch<SetStateAction<string>>;
};

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" },
  { label: "Pull Requests", value: "pulls" },
];

export default function FilterBar({ setStatus }: FilterBarProps) {
  return (
    <div className="flex space-x-4 my-4">
      {filterOptions.map(({ label, value }) => (
        <Button key={value} onClick={() => setStatus(value)}>
          {label}
        </Button>
      ))}
    </div>
  );
}
