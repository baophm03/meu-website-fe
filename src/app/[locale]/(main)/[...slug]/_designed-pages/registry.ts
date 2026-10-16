import { ComponentType } from "react";
import AboutPage from "./about/page";
import AboutCareersPage from "./careers/page";
import AboutLeadershipPage from "./leadership/page";
import AboutLocationsPage from "./locations/page";
import AboutPartnersClientsPage from "./partners-clients/page";
import AboutVisionMissionPage from "./vision-mission/page";
import CaseStudiesPage from "./case-studies/page";
import CaseStudiesFeaturedPage from "./featured/page";
import CaseStudiesIndustryPage from "./case-studies-industry/page";
import CaseStudiesSolutionPage from "./solution/page";
import CaseStudiesTechnologyPage from "./technology/page";
import ContactPage from "./contact/page";
import IndustriesPage from "./industries/page";
import IndustriesAssociationsOrganizationsPage from "./associations-organizations/page";
import IndustriesEducationTrainingPage from "./education-training/page";
import IndustriesHealthcarePage from "./healthcare/page";
import IndustriesLogisticsSupplyChainPage from "./logistics-supply-chain/page";
import IndustriesPharmaceuticalLifeSciencesPage from "./pharmaceutical-life-sciences/page";
import IndustriesRetailCommercePage from "./retail-commerce/page";
import InsightsPage from "./insights/page";
import InsightsAiAutomationPage from "./ai-automation/page";
import InsightsEnterpriseTechPage from "./enterprise-tech/page";
import IndustryPage from "./industry/page";
import InsightsNewsPage from "./news/page";
import InsightsReportsPage from "./reports/page";
import SoftwareEngineeringPage from "./software-engineering/page";
import ProductsPage from "./products/page";
import ProductsMeosEcommercePage from "./meos-ecommerce/page";
import ProductsMeosEcosystemPage from "./meos-ecosystem/page";
import ProductsMeosHicarePage from "./meos-hicare/page";
import ProductsMeosMiniappPage from "./meos-miniapp/page";
import ProductsMeosOmniPage from "./meos-omni/page";
import SolutionsPage from "./solutions/page";
import SolutionsAiConsultingPage from "./ai-consulting/page";
import SolutionsAiEngineeringPage from "./ai-engineering/page";
import SolutionsBusinessProcessOptimizationPage from "./business-process-optimization/page";
import SolutionsBusinessSolutionsPage from "./business-solutions/page";
import SolutionsCloudDevopsPage from "./cloud-devops/page";
import SolutionsCustomSoftwareSolutionsPage from "./custom-software-solutions/page";
import SolutionsCustomerExperiencePage from "./customer-experience/page";
import SolutionsDigitalCommercePage from "./digital-commerce/page";
import SolutionsDigitalTransformationPage from "./solutions-digital-transformation/page";
import SolutionsEnterpriseManagementPage from "./enterprise-management/page";
import SolutionsItTalentSolutionsPage from "./it-talent-solutions/page";
import SolutionsMaintenanceManagedServicesPage from "./maintenance-managed-services/page";
import SolutionsProductUiUxDesignPage from "./product-ui-ux-design/page";
import SolutionsQualityEngineeringPage from "./quality-engineering/page";
import SolutionsSystemIntegrationPage from "./system-integration/page";
import SolutionsTalentEnablementPage from "./talent-enablement/page";
import SolutionsTechnologyCapabilitiesPage from "./technology-capabilities/page";
import SolutionsTechnologyConsultingPage from "./technology-consulting/page";
import SolutionsTechnologyTrainingPage from "./technology-training/page";
import SolutionsWebsiteOperationsPage from "./website-operations/page";
import TrustPage from "./trust/page";
import TrustCookiePolicyPage from "./cookie-policy/page";
import TrustDataProtectionPage from "./data-protection/page";
import TrustPrivacyPage from "./privacy/page";
import TrustResponsibleAiPage from "./responsible-ai/page";
import TrustSecurityPage from "./security/page";
import TrustTermsOfUsePage from "./terms-of-use/page";

export const DESIGNED_PAGE_COMPONENTS: Record<string, ComponentType<{ slug: string[] }>> = {
  about: AboutPage,
  "careers": AboutCareersPage,
  "leadership": AboutLeadershipPage,
  "locations": AboutLocationsPage,
  "partners-clients": AboutPartnersClientsPage,
  "vision-mission": AboutVisionMissionPage,
  "case-studies": CaseStudiesPage,
  "featured": CaseStudiesFeaturedPage,
  "case-studies-industry": CaseStudiesIndustryPage,
  "solution": CaseStudiesSolutionPage,
  "technology": CaseStudiesTechnologyPage,
  contact: ContactPage,
  industries: IndustriesPage,
  "associations-organizations": IndustriesAssociationsOrganizationsPage,
  "education-training": IndustriesEducationTrainingPage,
  "healthcare": IndustriesHealthcarePage,
  "logistics-supply-chain": IndustriesLogisticsSupplyChainPage,
  "pharmaceutical-life-sciences": IndustriesPharmaceuticalLifeSciencesPage,
  "retail-commerce": IndustriesRetailCommercePage,
  insights: InsightsPage,
  "ai-automation": InsightsAiAutomationPage,
  "enterprise-tech": InsightsEnterpriseTechPage,
  "industry": IndustryPage,
  "news": InsightsNewsPage,
  "reports": InsightsReportsPage,
  "software-engineering": SoftwareEngineeringPage,
  products: ProductsPage,
  "meos-ecommerce": ProductsMeosEcommercePage,
  "meos-ecosystem": ProductsMeosEcosystemPage,
  "meos-hicare": ProductsMeosHicarePage,
  "meos-miniapp": ProductsMeosMiniappPage,
  "meos-omni": ProductsMeosOmniPage,
  solutions: SolutionsPage,
  "ai-consulting": SolutionsAiConsultingPage,
  "ai-engineering": SolutionsAiEngineeringPage,
  "business-process-optimization": SolutionsBusinessProcessOptimizationPage,
  "business-solutions": SolutionsBusinessSolutionsPage,
  "cloud-devops": SolutionsCloudDevopsPage,
  "custom-software-solutions": SolutionsCustomSoftwareSolutionsPage,
  "customer-experience": SolutionsCustomerExperiencePage,
  "digital-commerce": SolutionsDigitalCommercePage,
  "solutions-digital-transformation": SolutionsDigitalTransformationPage,
  "enterprise-management": SolutionsEnterpriseManagementPage,
  "it-talent-solutions": SolutionsItTalentSolutionsPage,
  "maintenance-managed-services": SolutionsMaintenanceManagedServicesPage,
  "product-ui-ux-design": SolutionsProductUiUxDesignPage,
  "quality-engineering": SolutionsQualityEngineeringPage,
  "system-integration": SolutionsSystemIntegrationPage,
  "talent-enablement": SolutionsTalentEnablementPage,
  "technology-capabilities": SolutionsTechnologyCapabilitiesPage,
  "technology-consulting": SolutionsTechnologyConsultingPage,
  "technology-training": SolutionsTechnologyTrainingPage,
  "website-operations": SolutionsWebsiteOperationsPage,
  trust: TrustPage,
  "cookie-policy": TrustCookiePolicyPage,
  "data-protection": TrustDataProtectionPage,
  "privacy": TrustPrivacyPage,
  "responsible-ai": TrustResponsibleAiPage,
  "security": TrustSecurityPage,
  "terms-of-use": TrustTermsOfUsePage,
};
