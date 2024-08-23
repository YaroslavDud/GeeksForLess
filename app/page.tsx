"use client";

import { useState, useCallback, useMemo } from "react";

import FilterBar from "@/components/FilterBar";
import IssueList from "@/components/IssueList";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const [repoPath, setRepoPath] = useState("");

  const [issues, setIssues] = useState([]);
  const [status, setStatus] = useState("all");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (url: string) => {
    setRepoPath(url.replace("https://github.com/", ""));
  };

  const handleResponse = useCallback(async () => {
    if (!repoPath) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.github.com/repos/${repoPath}/issues`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setIssues(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [repoPath]);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      switch (status) {
        case "open":
          return issue.state === "open" && !issue.pull_request;
        case "closed":
          return issue.state === "closed" && !issue.pull_request;
        case "pulls":
          return issue.pull_request;
        default:
          return true;
      }
    });
  }, [issues, status]);

  return (
    <main className="container mx-auto">
      <h1 className="text-2xl font-bold text-center my-8">
        GitHub Issue Search
      </h1>
      <SearchBar onSearch={handleSearch} onClick={handleResponse} />

      {loading && (
        <p className="text-center text-blue-600">Loading issues...</p>
      )}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && !error && issues.length > 0 && (
        <>
          <FilterBar setStatus={setStatus} />
          {filteredIssues.length > 0 ? (
            <IssueList issues={filteredIssues} />
          ) : (
            <p>No issues found.</p>
          )}
        </>
      )}
    </main>
  );
}
