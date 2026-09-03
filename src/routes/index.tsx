import { createFileRoute } from "@tanstack/react-router";
import { DesktopShell } from "@/components/desktop/desktop-shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <DesktopShell />;
}
