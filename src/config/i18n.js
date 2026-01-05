import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Configuración de i18next para Reverso Social
i18n
    // Carga de traducciones desde /public/locales/ (lazy loading)
    .use(HttpBackend)

    // Detección automática del idioma del navegador
    .use(LanguageDetector)

    // Integración con React
    .use(initReactI18next)

    // Inicialización
    .init({
        // Idioma por defecto
        fallbackLng: 'es',

        // Idiomas soportados
        supportedLngs: ['es', 'ca'],

        // Namespace por defecto
        defaultNS: 'translation',

        // Namespaces disponibles
        ns: ['translation', 'auth', 'forms', 'admin', 'errors'],

        // Configuración de detección de idioma
        detection: {
            // Orden de detección: localStorage > navigator language
            order: ['localStorage', 'navigator'],

            // Guardar idioma seleccionado en localStorage
            caches: ['localStorage'],

            // Key para localStorage
            lookupLocalStorage: 'reverso-social-lang',
        },

        // Configuración del backend (carga de archivos JSON)
        backend: {
            // Ruta a los archivos de traducción
            loadPath: '/locales/{{lng}}/{{ns}}.json',

            // Configuración adicional para desarrollo
            crossDomain: false,
        },

        // Interpolación
        interpolation: {
            // React ya escapa por defecto
            escapeValue: false,
        },

        // Configuración de React
        react: {
            // Usar Suspense para manejar carga de traducciones
            useSuspense: true,
        },

        // Mostrar warnings en desarrollo
        debug: import.meta.env.DEV,
    });

// Actualizar el atributo lang del HTML cuando cambia el idioma
i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng;
});

// Establecer el idioma inicial en el HTML
document.documentElement.lang = i18n.language || 'es';

export default i18n;
