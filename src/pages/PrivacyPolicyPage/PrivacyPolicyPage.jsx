import React from 'react';
import './PrivacyPolicyPage.scss';
import SEO from '../../components/SEO/SEO';

const PrivacyPolicyPage = () => {
    return (
        <div className="privacy-policy">
            <SEO
                title="Política de Privacidad | Reverso Social"
                description="Política de Protección de Datos y Privacidad de Reverso Social."
            />
            <div className="privacy-policy__container">
                <h1 className="privacy-policy__title">Política de Protección de Datos y Privacidad</h1>

                <div className="privacy-policy__content">
                    <section>
                        <h2>1. Responsable del tratamiento</h2>
                        <p><strong>Responsable:</strong> Reverso Social (reversosocial.org)</p>
                        <p><strong>CIF:</strong> G22598882</p>
                        <p><strong>Domicilio:</strong> C/ Blas de Otero, 69, 11ºD, *** (Madrid, España) ***COMPLETAR/VERIFICAR CÓDIGO POSTAL***</p>
                        <p><strong>Email de contacto:</strong> reversocial@reversocial.org</p>
                        <p><strong>Delegado/a de Protección de Datos (DPD/DPO):</strong> ***INDICAR SI EXISTE (NOMBRE/ENTIDAD Y EMAIL)***</p>
                        <p><em>Si Reverso Social no dispone de DPD/DPO, este apartado puede eliminarse.</em></p>
                        <p>Reverso Social trata los datos personales conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).</p>
                    </section>

                    <section>
                        <h2>2. Qué datos recogemos</h2>
                        <p>Según el formulario o canal de contacto, Reverso Social puede tratar:</p>
                        <ul>
                            <li><strong>Datos identificativos y de contacto:</strong> nombre (si se solicita), correo electrónico.</li>
                            <li><strong>Datos de la comunicación:</strong> el mensaje que envíes y la información que incluyas.</li>
                            <li><strong>Datos técnicos mínimos:</strong> ***COMPLETAR SI HAY ANALÍTICA/LOGS/SEGURIDAD*** (por ejemplo, IP, navegador, logs del servidor, solo cuando sea necesario para seguridad y funcionamiento).</li>
                        </ul>
                        <p>Se solicitarán únicamente los datos adecuados, pertinentes y limitados a lo necesario.</p>
                    </section>

                    <section>
                        <h2>3. Dónde se recogen tus datos</h2>
                        <p>Tus datos se recogen a través de:</p>
                        <ul>
                            <li>Formularios del sitio web (por ejemplo, contacto, suscripción, descarga de recursos, etc.) ***ADAPTAR A LOS FORMULARIOS REALES***.</li>
                            <li>Email enviado a reversocial@reversocial.org.</li>
                            <li>***OTROS CANALES (si existen): redes sociales, eventos, etc.***.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Finalidades del tratamiento</h2>
                        <p>Reverso Social utilizará los datos personales para:</p>
                        <ul>
                            <li>Atender solicitudes y responder consultas.</li>
                            <li>Gestionar el contacto contigo por correo electrónico (seguimiento de tu solicitud).</li>
                            <li>Enviar comunicaciones por email sobre servicios de Reverso Social, únicamente con tu autorización cuando sea necesaria (información y ofertas de servicios propios).</li>
                            <li>***OTRAS FINALIDADES (si existen): gestión de inscripciones, voluntariado, donaciones, cuenta de usuario, etc.***.</li>
                        </ul>
                        <p>Reverso Social no traslada tus datos a terceros para que los usen con sus propias finalidades comerciales.</p>
                    </section>

                    <section>
                        <h2>5. Base jurídica del tratamiento</h2>
                        <p>Las bases legales aplicables, según el caso, son:</p>
                        <ul>
                            <li><strong>Consentimiento de la persona interesada</strong> (por ejemplo, cuando marcas la casilla para recibir información por email o te suscribes) (art. 6.1.a RGPD).</li>
                            <li><strong>Aplicación de medidas precontractuales o gestión de una solicitud</strong> (cuando nos contactas para pedir información o servicios) (art. 6.1.b RGPD).</li>
                            <li><strong>Cumplimiento de obligaciones legales</strong> (art. 6.1.c RGPD), si correspondiera.</li>
                            <li><strong>Comunicaciones comerciales por email:</strong> el envío de comunicaciones publicitarias o promocionales por correo electrónico está regulado por la LSSI y, con carácter general, requiere que hayan sido solicitadas o expresamente autorizadas.</li>
                        </ul>
                        <p>Puedes retirar tu consentimiento en cualquier momento (ver apartado “Derechos”).</p>
                    </section>

                    <section>
                        <h2>6. Destinatarios, encargados del tratamiento y ausencia de cesiones</h2>
                        <p>Reverso Social no cede datos a terceros para sus propias finalidades.</p>
                        <p>Para operar el sitio web y gestionar comunicaciones, pueden intervenir proveedores que actúan como encargados del tratamiento, bajo contrato y siguiendo instrucciones de Reverso Social.</p>
                        <p><strong>Encargados del tratamiento (lista):</strong></p>
                        <ul>
                            <li><strong>Hosting/servidores:</strong> ***NOMBRE DEL PROVEEDOR, PAÍS/REGIÓN, URL***</li>
                            <li><strong>Email/SMTP o plataforma de mailing:</strong> ***NOMBRE DEL PROVEEDOR, PAÍS/REGIÓN, URL***</li>
                            <li><strong>Analítica/cookies (si aplica):</strong> ***NOMBRE, FINALIDAD***</li>
                            <li><strong>Otros:</strong> ***COMPLETAR***</li>
                        </ul>
                    </section>

                    <section>
                        <h2>7. Transferencias internacionales</h2>
                        <p>Con carácter general, Reverso Social ***INDICAR SI***:</p>
                        <ul>
                            <li>(Opción A) No realiza transferencias internacionales fuera del Espacio Económico Europeo.</li>
                            <li>(Opción B) Sí puede realizar transferencias (por ejemplo, si algún proveedor aloja datos fuera del EEE). En ese caso, se indicarán los proveedores implicados y las garantías aplicables (por ejemplo, cláusulas contractuales tipo u otros mecanismos previstos por el RGPD).</li>
                        </ul>
                    </section>

                    <section>
                        <h2>8. Plazos de conservación</h2>
                        <p>Los datos se conservarán:</p>
                        <ul>
                            <li>Durante el tiempo necesario para atender tu solicitud y realizar seguimiento.</li>
                            <li>Si has autorizado comunicaciones por email, hasta que retires tu consentimiento o solicites la baja.</li>
                            <li>Posteriormente, durante los plazos necesarios para cumplimiento legal o atención de posibles responsabilidades.</li>
                        </ul>
                        <p><strong>Criterios concretos de conservación:</strong> ***COMPLETAR (por ejemplo: X meses/años)***.</p>
                    </section>

                    <section>
                        <h2>9. Derechos de las personas usuarias y cómo ejercerlos</h2>
                        <p>Puedes ejercer tus derechos de:</p>
                        <ul>
                            <li>Acceso, rectificación, supresión, oposición, limitación, portabilidad, y otros previstos por la normativa aplicable.</li>
                        </ul>
                        <p>Para ejercerlos, escribe a reversocial@reversocial.org indicando:</p>
                        <ul>
                            <li>“Ejercicio de derechos de protección de datos”</li>
                            <li>Tu solicitud concreta</li>
                            <li>***INDICAR SI SE SOLICITARÁ DOCUMENTO PARA VERIFICAR IDENTIDAD*** (recomendable: solo si es necesario)</li>
                        </ul>
                        <p>Si consideras que tus derechos no han sido atendidos, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).</p>
                        <p>En Cataluña, la APDCAT ofrece información y recursos sobre RGPD y protección de datos.</p>
                    </section>

                    <section>
                        <h2>10. Seguridad de la información</h2>
                        <p>Reverso Social aplica medidas técnicas y organizativas razonables para proteger los datos personales frente a acceso no autorizado, pérdida, alteración o divulgación indebida.</p>
                        <p><strong>Medidas específicas implementadas:</strong> ***COMPLETAR (por ejemplo: cifrado en tránsito HTTPS, control de accesos, copias de seguridad, registros, etc.)***.</p>
                    </section>

                    <section>
                        <h2>11. Menores de edad</h2>
                        <p>Los servicios de Reverso Social no están dirigidos a menores. Si el tratamiento se basara en el consentimiento, se aplicarán las reglas vigentes en España sobre consentimiento de menores, y en particular las limitaciones para menores de 14 años en tratamientos basados en consentimiento.</p>
                    </section>

                    <section>
                        <h2>12. Cookies y enlaces a terceros</h2>
                        <p><strong>Política de cookies:</strong> ***INDICAR SI EXISTE POLÍTICA DE COOKIES Y ENLAZARLA***.</p>
                        <p>Si el sitio incluye enlaces a páginas de terceros, Reverso Social no se responsabiliza de sus políticas de privacidad. Se recomienda revisarlas antes de facilitar datos.</p>
                    </section>

                    <section>
                        <h2>13. Cambios en la política</h2>
                        <p>Reverso Social puede actualizar esta política para adaptarla a cambios legales o a mejoras del servicio. La fecha de última actualización será indicada al final.</p>
                        <p><strong>Última actualización:</strong> ***DD/MM/AAAA***.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
