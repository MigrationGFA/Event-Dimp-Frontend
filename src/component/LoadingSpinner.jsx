import { Spinner } from "flowbite-react";

export function LoadingSmall() {
  return (
    <div className="h-4 w-4 border-2 border-t-2 border-primary1 rounded-full animate-spin" />
  );
}

export function LoadingMany() {
  return (
    <div className="flex flex-wrap gap-2">
      <Spinner color="info" aria-label="Info spinner example" />
      <Spinner color="success" aria-label="Success spinner example" />
      <Spinner color="failure" aria-label="Failure spinner example" />
      <Spinner color="warning" aria-label="Warning spinner example" />
      <Spinner color="pink" aria-label="Pink spinner example" />
      <Spinner color="purple" aria-label="Purple spinner example" />
    </div>
  );
}
