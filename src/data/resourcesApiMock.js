const mockResources = [
  {
    id: "8c1c5c2e-1111-4a11-9a11-aaaaaaaaaaa1",
    title: "Guía de Igualdad",
    description:
      "Manual práctico para empresas que buscan implementar políticas de igualdad efectivas en sus organizaciones.",
    type: "GUIDE",
    file_url: "/resources/equality-guide.pdf",
    preview_image_url: "/img/resources/equality-guide.webp",
    public: true,
    created_at: "2025-11-20T10:00:00Z",
    updated_at: "2025-11-22T09:30:00Z",
    user_id: "user-1",
  },
  {
    id: "8c1c5c2e-2222-4a22-9a22-aaaaaaaaaaa2",
    title: "Informe Brecha Salarial 2024",
    description:
      "Estudio detallado de investigación sobre la brecha salarial de género en España.",
    type: "REPORT",
    file_url: "/resources/paygap2024.pdf",
    preview_image_url: "/img/resources/paygap-report.webp",
    public: true,
    created_at: "2025-11-15T12:00:00Z",
    updated_at: "2025-11-18T16:45:00Z",
    user_id: "user-1",
  },
  {
    id: "8c1c5c2e-3333-4a33-9a33-aaaaaaaaaaa3",
    title: "Taller de Coeducación",
    description:
      "Sesión de formación grabada sobre coeducación y educación en igualdad.",
    type: "VIDEO",
    file_url: "/videos/coeducation.mp4",
    preview_image_url: "/img/resources/coeducation.webp",
    public: false,
    created_at: "2025-11-10T09:15:00Z",
    updated_at: "2025-11-10T09:15:00Z",
    user_id: "user-2",
  },
  {
    id: "8c1c5c2e-4444-4a44-9a44-aaaaaaaaaaa4",
    title: "Protocolo contra el Acoso",
    description:
      "Documento modelo para implementar un protocolo de prevención y actuación frente al acoso laboral.",
    type: "ARTICLE",
    file_url: "/resources/harassment-protocol.pdf",
    preview_image_url: "/img/resources/harassment-protocol.webp",
    public: true,
    created_at: "2025-11-05T14:20:00Z",
    updated_at: "2025-11-07T11:00:00Z",
    user_id: "user-1",
  },
  {
    id: "8c1c5c2e-5555-4a55-9a55-aaaaaaaaaaa5",
    title: "Checklist de Igualdad",
    description:
      "Herramienta práctica para evaluar el nivel de igualdad en tu organización.",
    type: "OTHER",
    file_url: "/resources/equality-checklist.pdf",
    preview_image_url: "/img/resources/equality-checklist.webp",
    public: true,
    created_at: "2025-11-01T08:00:00Z",
    updated_at: "2025-11-01T08:00:00Z",
    user_id: "user-3",
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const listResources = async () => {
  await delay(200);
  return mockResources;
};

export const resourcesApi = {
  listResources,
};
