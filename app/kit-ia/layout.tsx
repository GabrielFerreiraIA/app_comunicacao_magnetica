import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kit IA",
};

export default function KitIaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
