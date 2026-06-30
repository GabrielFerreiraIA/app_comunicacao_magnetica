import { notFound } from "next/navigation";
import { archetypes, getArchetype } from "@/lib/content/archetypes";
import { ArchetypeDetail } from "@/components/archetype-detail";

export function generateStaticParams() {
  return archetypes.map((a) => ({ slug: a.id }));
}

export default async function ArchetypeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const archetype = getArchetype(slug);
  if (!archetype) notFound();

  return <ArchetypeDetail archetype={archetype} />;
}
