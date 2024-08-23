import { Issue } from "@/types";
import {
  CheckCircleIcon,
  XCircleIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/solid";

type IssueListProps = {
  issues: Issue[];
};

export default function IssueList({ issues }: IssueListProps) {
  return (
    <ul className="space-y-4">
      {issues.map((issue) => (
        <li
          key={issue.id}
          className="p-4 border rounded-md flex items-center space-x-4"
        >
          {issue.pull_request ? (
            <CodeBracketIcon className="h-6 w-6 text-yellow-500" />
          ) : issue.state === "closed" ? (
            <XCircleIcon className="h-6 w-6 text-red-500" />
          ) : (
            <CheckCircleIcon className="h-6 w-6 text-green-500" />
          )}
          <a href={issue.html_url} target="_blank" className="text-blue-600">
            {issue.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
