import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Os 5 Pilares",
};

export default function PilaresLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
