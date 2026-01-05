/**
 * Utilidad para traducir códigos de error del backend
 * 
 * El backend envía códigos de error fijos (ej: EMAIL_ALREADY_EXISTS)
 * Esta función mapea esos códigos a mensajes traducidos
 */

/**
 * Traduce un código de error del backend al idioma actual
 * @param {string} errorCode - Código de error del backend (ej: 'EMAIL_ALREADY_EXISTS')
 * @param {function} t - Función de traducción de i18next
 * @returns {string} Mensaje de error traducido
 */
export const translateErrorCode = (errorCode, t) => {
    // Si no hay código de error, usar el error desconocido
    if (!errorCode) {
        return t('errors:UNKNOWN_ERROR');
    }

    // Intentar traducir el código específico, con fallback a UNKNOWN_ERROR
    const translatedMessage = t(`errors:${errorCode}`, {
        defaultValue: t('errors:UNKNOWN_ERROR')
    });

    return translatedMessage;
};

/**
 * Extrae el código de error de una respuesta de API Axios
 * @param {object} error - Error de Axios
 * @returns {string} Código de error o 'UNKNOWN_ERROR'
 */
export const extractErrorCode = (error) => {
    // Intentar obtener el código de error del backend
    const errorCode = error?.response?.data?.code ||
        error?.response?.data?.errorCode ||
        error?.code;

    // Si es un error de red
    if (!error.response) {
        return 'NETWORK_ERROR';
    }

    return errorCode || 'UNKNOWN_ERROR';
};

/**
 * Función helper completa para manejar errores de API
 * @param {object} error - Error de Axios
 * @param {function} t - Función de traducción de i18next
 * @returns {string} Mensaje de error traducido
 */
export const handleApiError = (error, t) => {
    const errorCode = extractErrorCode(error);
    return translateErrorCode(errorCode, t);
};

export default {
    translateErrorCode,
    extractErrorCode,
    handleApiError
};
