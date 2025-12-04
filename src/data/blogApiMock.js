const mockPosts = [
  {
    id: 1,
    slug: "impacto-igualdad-2024",
    title: "El Impacto de la Igualdad en 2024",
    excerpt:
      "Descubre cómo las nuevas políticas están transformando el entorno laboral y social.",
    body:
      "En 2024 hemos visto avances significativos en políticas de igualdad. Este artículo explora los hitos clave y su impacto en comunidades locales.",
    date: "1 dic 2025",
    category: "Actualidad",
    image: "https://images.pexels.com/photos/6257786/pexels-photo-6257786.jpeg",
    author: "Equipo Reverso",
    readingTime: 5,
    status: "PUBLISHED",
  },
  {
    id: 2,
    slug: "brecha-salarial",
    title: "Rompiendo la Brecha Salarial",
    excerpt:
      "Análisis profundo sobre los pasos necesarios para alcanzar una equidad financiera real.",
    body:
      "La brecha salarial persiste, pero existen herramientas para acortarla: auditorías salariales, transparencia y políticas activas de igualdad.",
    date: "28 nov 2025",
    category: "Economía",
    image: "https://images.pexels.com/photos/2041393/pexels-photo-2041393.jpeg",
    author: "Equipo Reverso",
    readingTime: 6,
    status: "PUBLISHED",
  },
  {
    id: 3,
    slug: "vision-feminista",
    title: "Nuestra Visión Feminista",
    excerpt:
      "Conoce más sobre los valores que mueven a Reverso Social y nuestra misión política.",
    body:
      "Creemos en un feminismo interseccional y transformador. Compartimos nuestros principios y cómo los aplicamos en cada proyecto.",
    date: "20 nov 2025",
    category: "Institucional",
    image: "https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg",
    author: "Equipo Reverso",
    readingTime: 4,
    status: "PUBLISHED",
  },
  {
    id: 4,
    slug: "inclusion-social",
    title: "Proyectos de Inclusión Social",
    excerpt:
      "Un repaso por las iniciativas que hemos lanzado este último trimestre.",
    body:
      "Visitamos distintos territorios y colaboramos con comunidades para impulsar inclusión y equidad. Aquí resumimos aprendizajes y próximos pasos.",
    date: "15 nov 2025",
    category: "Proyectos",
    image: "https://images.pexels.com/photos/2041398/pexels-photo-2041398.jpeg",
    author: "Equipo Reverso",
    readingTime: 5,
    status: "PUBLISHED",
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const listPosts = async () => {
  await delay(200);
  return mockPosts.filter((p) => p.status === "PUBLISHED");
};

const getPostBySlug = async (slug) => {
  await delay(200);
  const found = mockPosts.find((p) => p.slug === slug && p.status === "PUBLISHED");
  if (!found) throw new Error("Not found");
  return found;
};

export const blogApi = {
  listPosts,
  getPostBySlug,
};
