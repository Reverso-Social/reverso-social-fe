import React from 'react';
import { useTranslation } from 'react-i18next';
import './PrivacyPolicyPage.scss';
import SEO from '../../components/SEO/SEO';

const PrivacyPolicyPage = () => {
    const { t } = useTranslation('privacy');
    const sections = t('sections', { returnObjects: true });

    return (
        <div className="privacy-policy">
            <SEO
                title={t('seoTitle')}
                description={t('seoDescription')}
            />
            <div className="privacy-policy__container">
                <h1 className="privacy-policy__title">{t('pageTitle')}</h1>

                <div className="privacy-policy__content">
                    <section>
                        <h2>{sections.responsible.title}</h2>
                        <p><strong>Responsable:</strong> {sections.responsible.name}</p>
                        <p><strong>CIF:</strong> {sections.responsible.cif}</p>
                        <p><strong>Domicilio:</strong> {sections.responsible.address}</p>
                        <p><strong>Email de contacto:</strong> {sections.responsible.email}</p>
                        <p><strong>Delegado/a de Protección de Datos (DPD/DPO):</strong> {sections.responsible.dpo}</p>
                        <p><em>{sections.responsible.dpoNote}</em></p>
                        <p>{sections.responsible.compliance}</p>
                    </section>

                    <section>
                        <h2>{sections.dataCollected.title}</h2>
                        <p>{sections.dataCollected.intro}</p>
                        <ul>
                            {sections.dataCollected.items.map((item, idx) => (
                                <li key={idx}>
                                    <strong>{item.label}</strong> {item.description}
                                </li>
                            ))}
                        </ul>
                        <p>{sections.dataCollected.footer}</p>
                    </section>

                    <section>
                        <h2>{sections.dataSource.title}</h2>
                        <p>{sections.dataSource.intro}</p>
                        <ul>
                            {sections.dataSource.items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2>{sections.purposes.title}</h2>
                        <p>{sections.purposes.intro}</p>
                        <ul>
                            {sections.purposes.items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                        <p>{sections.purposes.footer}</p>
                    </section>

                    <section>
                        <h2>{sections.legalBasis.title}</h2>
                        <p>{sections.legalBasis.intro}</p>
                        <ul>
                            {sections.legalBasis.items.map((item, idx) => (
                                <li key={idx}>
                                    <strong>{item.label}</strong> {item.description}
                                </li>
                            ))}
                        </ul>
                        <p>{sections.legalBasis.footer}</p>
                    </section>

                    <section>
                        <h2>{sections.recipients.title}</h2>
                        <p>{sections.recipients.intro}</p>
                        <p>{sections.recipients.middleText}</p>
                        <p><strong>{sections.recipients.processorsList}</strong></p>
                        <ul>
                            {sections.recipients.processors.map((proc, idx) => (
                                <li key={idx}>
                                    <strong>{proc.label}</strong> {proc.value}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2>{sections.internationalTransfers.title}</h2>
                        <p>{sections.internationalTransfers.intro}</p>
                        <ul>
                            {sections.internationalTransfers.options.map((opt, idx) => (
                                <li key={idx}>{opt}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2>{sections.retention.title}</h2>
                        <p>{sections.retention.intro}</p>
                        <ul>
                            {sections.retention.items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                        <p><strong>{sections.retention.criteria}</strong> {sections.retention.criteriaValue}</p>
                    </section>

                    <section>
                        <h2>{sections.rights.title}</h2>
                        <p>{sections.rights.intro}</p>
                        <ul>
                            {sections.rights.rightsList.map((right, idx) => (
                                <li key={idx}>{right}</li>
                            ))}
                        </ul>
                        <p>{sections.rights.exerciseIntro}</p>
                        <ul>
                            {sections.rights.exerciseItems.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                        <p>{sections.rights.complaint}</p>
                        <p>{sections.rights.catalonia}</p>
                    </section>

                    <section>
                        <h2>{sections.security.title}</h2>
                        <p>{sections.security.intro}</p>
                        <p><strong>{sections.security.measures}</strong> {sections.security.measuresValue}</p>
                    </section>

                    <section>
                        <h2>{sections.minors.title}</h2>
                        <p>{sections.minors.content}</p>
                    </section>

                    <section>
                        <h2>{sections.cookies.title}</h2>
                        <p><strong>{sections.cookies.policy}</strong> {sections.cookies.policyValue}</p>
                        <p>{sections.cookies.thirdParty}</p>
                    </section>

                    <section>
                        <h2>{sections.changes.title}</h2>
                        <p>{sections.changes.content}</p>
                        <p><strong>{sections.changes.lastUpdate}</strong> {sections.changes.lastUpdateValue}</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
