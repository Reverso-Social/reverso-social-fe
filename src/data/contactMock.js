const STORAGE_KEY = "reverso_contact_entries";

const seedContacts = [
  {
    id: "seed-1",
    nombre: "María Pérez",
    email: "maria@example.com",
    entidad: "Colectivo Horizonte",
    intereses: "Colaboración en talleres comunitarios",
    createdAt: new Date().toISOString(),
    source: "seed",
  },
  {
    id: "seed-2",
    nombre: "Juan López",
    email: "juan@example.com",
    entidad: "Fundación Futuro",
    intereses: "Voluntariado y difusión",
    createdAt: new Date().toISOString(),
    source: "seed",
  },
];

const parseSafe = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const ensureSeedData = () => {
  const stored = parseSafe(localStorage.getItem(STORAGE_KEY));
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedContacts));
  }
};

const getAll = () => {
  ensureSeedData();
  return parseSafe(localStorage.getItem(STORAGE_KEY)) || [];
};

const add = (payload) => {
  ensureSeedData();

  const newEntry = {
    ...payload,
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    createdAt: new Date().toISOString(),
    source: "user",
  };

  const contacts = getAll();
  contacts.push(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));

  return newEntry;
};

export const contactMock = {
  ensureSeedData,
  getAll,
  add,
};
