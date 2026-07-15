// Poses de referência (fotos) por arquétipo, separadas por versão feminina e masculina.
// Arquivos em public/poses/<id>/<feminino|masculino>/pose-N.png.
// Arquétipos sem pasta de poses (ainda não recebemos as fotos) simplesmente não aparecem aqui.

export type ArchetypePoses = {
  feminino: string[];
  masculino: string[];
};

const counts: Record<string, { feminino?: number; masculino?: number }> = {
  amante: { feminino: 4, masculino: 4 },
  bobo: { feminino: 4, masculino: 4 },
  criador: { feminino: 3, masculino: 3 },
  cuidador: { feminino: 4, masculino: 4 },
  explorador: { feminino: 3, masculino: 3 },
  foradalei: { masculino: 4 },
  governante: { feminino: 4, masculino: 5 },
  heroi: { feminino: 4, masculino: 4 },
  inocente: { feminino: 5, masculino: 3 },
  mago: { feminino: 5, masculino: 3 },
  sabio: { feminino: 5, masculino: 5 },
};

function buildPaths(id: string, gender: "feminino" | "masculino", count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/poses/${id}/${gender}/pose-${i + 1}.png`);
}

export const archetypePoses: Record<string, ArchetypePoses> = Object.fromEntries(
  Object.entries(counts).map(([id, { feminino, masculino }]) => [
    id,
    {
      feminino: feminino ? buildPaths(id, "feminino", feminino) : [],
      masculino: masculino ? buildPaths(id, "masculino", masculino) : [],
    },
  ]),
);

export function getArchetypePoses(id: string): ArchetypePoses | undefined {
  return archetypePoses[id];
}
