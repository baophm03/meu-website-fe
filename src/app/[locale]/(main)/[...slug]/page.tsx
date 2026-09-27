import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getStaticPageMeta } from "@/mockdata/pages";
import { getPostBySlug, getRelatedPosts } from "@/mockdata/posts";
import { fetchPublicCaseStudyBySlug, fetchPublicPostBySlug } from "@/utils/public-posts";
import { fetchPublicJobBySlug } from "@/utils/public-jobs";
import PostDetailPage from "./templates/post-detail";
import JobDetailPage from "./templates/job-detail";
import CaseStudyDetailPage from "./templates/case-study-detail";
import AboutPage from "./static-pages/about";
import CaseStudiesPage from "./static-pages/case-studies";
import ContactPage from "./static-pages/contact";
import IndustriesPage from "./static-pages/industries";
import InsightsPage from "./static-pages/insights";
import ProductsPage from "./static-pages/products";
import SolutionsPage from "./static-pages/solutions";
import TrustPage from "./static-pages/trust";
// about
import AboutCareersPage from "./static-pages/about-careers";
import AboutLeadershipPage from "./static-pages/about-leadership";
import AboutLocationsPage from "./static-pages/about-locations";
import AboutPartnersClientsPage from "./static-pages/about-partners-clients";
import AboutStoryPage from "./static-pages/about-story";
import AboutVisionMissionPage from "./static-pages/about-vision-mission";
// case-studies
import CaseStudiesFeaturedPage from "./static-pages/case-studies-featured";
import CaseStudiesIndustryPage from "./static-pages/case-studies-industry";
import CaseStudiesSolutionPage from "./static-pages/case-studies-solution";
import CaseStudiesTechnologyPage from "./static-pages/case-studies-technology";
// industries
import IndustriesAssociationsOrganizationsPage from "./static-pages/industries-associations-organizations";
import IndustriesEducationTrainingPage from "./static-pages/industries-education-training";
import IndustriesHealthcarePage from "./static-pages/industries-healthcare";
import IndustriesLogisticsSupplyChainPage from "./static-pages/industries-logistics-supply-chain";
import IndustriesPharmaceuticalLifeSciencesPage from "./static-pages/industries-pharmaceutical-life-sciences";
import IndustriesRetailCommercePage from "./static-pages/industries-retail-commerce";
// insights
import InsightsAiAutomationPage from "./static-pages/insights-ai-automation";
import InsightsDigitalTransformationPage from "./static-pages/insights-digital-transformation";
import InsightsEnterpriseTechPage from "./static-pages/insights-enterprise-tech";
import InsightsIndustryPage from "./static-pages/insights-industry";
import InsightsNewsPage from "./static-pages/insights-news";
import InsightsReportsPage from "./static-pages/insights-reports";
import InsightsSoftwareEngineeringPage from "./static-pages/insights-software-engineering";
// products
import ProductsAiPage from "./static-pages/products-ai";
import ProductsCommercePage from "./static-pages/products-commerce";
import ProductsEnterprisePage from "./static-pages/products-enterprise";
import ProductsIndustryPage from "./static-pages/products-industry";
import ProductsMeosPage from "./static-pages/products-meos";
import ProductsMeos365Page from "./static-pages/products-meos-365";
import ProductsMeosEcommercePage from "./static-pages/products-meos-ecommerce";
import ProductsMeosMiniappPage from "./static-pages/products-meos-miniapp";
import ProductsMeosOmniPage from "./static-pages/products-meos-omni";
// solutions
import SolutionsAiConsultingPage from "./static-pages/solutions-ai-consulting";
import SolutionsAiEngineeringPage from "./static-pages/solutions-ai-engineering";
import SolutionsAiIntelligentAutomationPage from "./static-pages/solutions-ai-intelligent-automation";
import SolutionsBusinessProcessOptimizationPage from "./static-pages/solutions-business-process-optimization";
import SolutionsBusinessSolutionsPage from "./static-pages/solutions-business-solutions";
import SolutionsCloudDevopsPage from "./static-pages/solutions-cloud-devops";
import SolutionsCustomSoftwareSolutionsPage from "./static-pages/solutions-custom-software-solutions";
import SolutionsCustomerExperiencePage from "./static-pages/solutions-customer-experience";
import SolutionsDigitalCommercePage from "./static-pages/solutions-digital-commerce";
import SolutionsDigitalTransformationPage from "./static-pages/solutions-digital-transformation";
import SolutionsEnterpriseManagementPage from "./static-pages/solutions-enterprise-management";
import SolutionsItTalentSolutionsPage from "./static-pages/solutions-it-talent-solutions";
import SolutionsMaintenanceManagedServicesPage from "./static-pages/solutions-maintenance-managed-services";
import SolutionsProductUiUxDesignPage from "./static-pages/solutions-product-ui-ux-design";
import SolutionsQualityEngineeringPage from "./static-pages/solutions-quality-engineering";
import SolutionsSoftwareEngineeringPage from "./static-pages/solutions-software-engineering";
import SolutionsSystemIntegrationPage from "./static-pages/solutions-system-integration";
import SolutionsTalentEnablementPage from "./static-pages/solutions-talent-enablement";
import SolutionsTechnologyCapabilitiesPage from "./static-pages/solutions-technology-capabilities";
import SolutionsTechnologyConsultingPage from "./static-pages/solutions-technology-consulting";
import SolutionsTechnologyTrainingPage from "./static-pages/solutions-technology-training";
import SolutionsWebsiteOperationsPage from "./static-pages/solutions-website-operations";
// trust
import TrustCookiePolicyPage from "./static-pages/trust-cookie-policy";
import TrustDataProtectionPage from "./static-pages/trust-data-protection";
import TrustPrivacyPage from "./static-pages/trust-privacy";
import TrustResponsibleAiPage from "./static-pages/trust-responsible-ai";
import TrustSecurityPage from "./static-pages/trust-security";
import TrustTermsOfUsePage from "./static-pages/trust-terms-of-use";

type Props = {
  params: Promise<{ locale: string; slug: string[] }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

/** `?type=jobs` marks the leaf slug as a job posting instead of a news post. */
const contentTypeOf = (
  searchParams: Record<string, string | string[] | undefined> | undefined,
) => {
  const raw = searchParams?.type;
  return Array.isArray(raw) ? raw[0] : raw;
};

const endingSlugOf = (slug: string[] | undefined) =>
  slug && slug.length > 0 ? String(slug[slug.length - 1] ?? "") : "";

/** `parent/leaf` key — disambiguates leaf slugs shared across branches. */
const pathKeyOf = (slug: string[] | undefined) =>
  slug && slug.length > 1 ? slug[slug.length - 2] + "/" + slug[slug.length - 1] : "";

/**
 * Catch-all resolver — mirrors vcci-news: a page is reachable whenever the
 * LAST path segment matches a static page or a news post slug. The preceding
 * path is ignored; colliding leaf slugs are disambiguated by the parent
 * segment via `parent/leaf` cases.
 */
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const endingSlug = endingSlugOf(slug);
  const isVi = locale === "vi";

  const pageMeta = getStaticPageMeta(endingSlug);
  if (pageMeta) {
    return {
      title: isVi ? pageMeta.titleVi : pageMeta.titleEn,
      description: isVi ? pageMeta.descriptionVi : pageMeta.descriptionEn
    };
  }

  if (contentTypeOf(sp) === "jobs") {
    const apiJob = await fetchPublicJobBySlug(endingSlug);
    if (apiJob) { return { title: apiJob.job.title, description: apiJob.job.summary }; }
    return {};
  }

  if (contentTypeOf(sp) === "case-studies") {
    const apiCaseStudy = await fetchPublicCaseStudyBySlug(endingSlug);
    if (apiCaseStudy) { return { title: apiCaseStudy.post.title, description: apiCaseStudy.post.excerpt }; }
    return {};
  }

  const post = getPostBySlug(endingSlug);
  if (post) {
    return {
      title: isVi ? post.title : post.titleEn,
      description: isVi ? post.excerpt : post.excerptEn
    };
  }

  const apiPost = await fetchPublicPostBySlug(endingSlug);
  if (apiPost) { return { title: apiPost.post.title, description: apiPost.post.excerpt }; }

  return {};
}

export default async function Page({ params, searchParams }: Props) {
  const { locale, slug } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const endingSlug = endingSlugOf(slug);
  if (!endingSlug) return notFound();

  // 1. Colliding leaf slugs — parent/leaf keeps each branch's URL correct
  switch (pathKeyOf(slug)) {
    case "case-studies/industry":
      return <CaseStudiesIndustryPage slug={slug} />;
    case "insights/digital-transformation":
      return <InsightsDigitalTransformationPage slug={slug} />;
    case "insights/industry":
      return <InsightsIndustryPage slug={slug} />;
    case "insights/software-engineering":
      return <InsightsSoftwareEngineeringPage slug={slug} />;
    case "products/industry":
      return <ProductsIndustryPage />;
    case "solutions/digital-transformation":
      return <SolutionsDigitalTransformationPage slug={slug} />;
    case "solutions/software-engineering":
      return <SolutionsSoftwareEngineeringPage slug={slug} />;
  }

  // 2. Static pages — last segment decides, prefix is ignored
  switch (endingSlug) {
    case "industry":
      return <InsightsIndustryPage slug={slug} />;
    case "digital-transformation":
      return <SolutionsDigitalTransformationPage slug={slug} />;
    case "software-engineering":
      return <SolutionsSoftwareEngineeringPage slug={slug} />;
    case "about":
      return <AboutPage />;
    case "case-studies":
      return <CaseStudiesPage slug={slug} />;
    case "contact":
      return <ContactPage />;
    case "industries":
      return <IndustriesPage slug={slug} />;
    case "insights":
      return <InsightsPage slug={slug} />;
    case "products":
      return <ProductsPage />;
    case "solutions":
      return <SolutionsPage slug={slug} />;
    case "trust":
      return <TrustPage />;
    case "careers":
      return <AboutCareersPage />;
    case "leadership":
      return <AboutLeadershipPage />;
    case "locations":
      return <AboutLocationsPage />;
    case "partners-clients":
      return <AboutPartnersClientsPage />;
    case "story":
      return <AboutStoryPage />;
    case "vision-mission":
      return <AboutVisionMissionPage />;
    case "featured":
      return <CaseStudiesFeaturedPage slug={slug} />;
    case "solution":
      return <CaseStudiesSolutionPage slug={slug} />;
    case "technology":
      return <CaseStudiesTechnologyPage slug={slug} />;
    case "associations-organizations":
      return <IndustriesAssociationsOrganizationsPage slug={slug} />;
    case "education-training":
      return <IndustriesEducationTrainingPage slug={slug} />;
    case "healthcare":
      return <IndustriesHealthcarePage slug={slug} />;
    case "logistics-supply-chain":
      return <IndustriesLogisticsSupplyChainPage slug={slug} />;
    case "pharmaceutical-life-sciences":
      return <IndustriesPharmaceuticalLifeSciencesPage slug={slug} />;
    case "retail-commerce":
      return <IndustriesRetailCommercePage slug={slug} />;
    case "ai-automation":
      return <InsightsAiAutomationPage slug={slug} />;
    case "enterprise-tech":
      return <InsightsEnterpriseTechPage slug={slug} />;
    case "news":
      return <InsightsNewsPage slug={slug} />;
    case "reports":
      return <InsightsReportsPage slug={slug} />;
    case "ai":
      return <ProductsAiPage />;
    case "commerce":
      return <ProductsCommercePage />;
    case "enterprise":
      return <ProductsEnterprisePage />;
    case "meos-ecosystem":
      return <ProductsMeosPage />;
    case "meos-365":
      return <ProductsMeos365Page />;
    case "meos-ecommerce":
      return <ProductsMeosEcommercePage />;
    case "meos-miniapp":
      return <ProductsMeosMiniappPage />;
    case "meos-omni":
      return <ProductsMeosOmniPage />;
    case "ai-consulting":
      return <SolutionsAiConsultingPage slug={slug} />;
    case "ai-engineering":
      return <SolutionsAiEngineeringPage slug={slug} />;
    case "ai-intelligent-automation":
      return <SolutionsAiIntelligentAutomationPage slug={slug} />;
    case "business-process-optimization":
      return <SolutionsBusinessProcessOptimizationPage slug={slug} />;
    case "business-solutions":
      return <SolutionsBusinessSolutionsPage slug={slug} />;
    case "cloud-devops":
      return <SolutionsCloudDevopsPage slug={slug} />;
    case "custom-software-solutions":
      return <SolutionsCustomSoftwareSolutionsPage slug={slug} />;
    case "customer-experience":
      return <SolutionsCustomerExperiencePage slug={slug} />;
    case "digital-commerce":
      return <SolutionsDigitalCommercePage slug={slug} />;
    case "enterprise-management":
      return <SolutionsEnterpriseManagementPage slug={slug} />;
    case "it-talent-solutions":
      return <SolutionsItTalentSolutionsPage slug={slug} />;
    case "maintenance-managed-services":
      return <SolutionsMaintenanceManagedServicesPage slug={slug} />;
    case "product-ui-ux-design":
      return <SolutionsProductUiUxDesignPage slug={slug} />;
    case "quality-engineering":
      return <SolutionsQualityEngineeringPage slug={slug} />;
    case "system-integration":
      return <SolutionsSystemIntegrationPage slug={slug} />;
    case "talent-enablement":
      return <SolutionsTalentEnablementPage slug={slug} />;
    case "technology-capabilities":
      return <SolutionsTechnologyCapabilitiesPage slug={slug} />;
    case "technology-consulting":
      return <SolutionsTechnologyConsultingPage slug={slug} />;
    case "technology-training":
      return <SolutionsTechnologyTrainingPage slug={slug} />;
    case "website-operations":
      return <SolutionsWebsiteOperationsPage slug={slug} />;
    case "cookie-policy":
      return <TrustCookiePolicyPage />;
    case "data-protection":
      return <TrustDataProtectionPage />;
    case "privacy":
      return <TrustPrivacyPage />;
    case "responsible-ai":
      return <TrustResponsibleAiPage />;
    case "security":
      return <TrustSecurityPage />;
    case "terms-of-use":
      return <TrustTermsOfUsePage />;
  }

  // 3. Job detail — jobs table entity, only resolved when explicitly
  //    marked via ?type=jobs so a slug never needs a posts-table miss first
  if (contentTypeOf(sp) === "jobs") {
    const apiJob = await fetchPublicJobBySlug(endingSlug);
    if (apiJob) { return <JobDetailPage job={apiJob.job} related={apiJob.related} locale={locale} />; }
    return notFound();
  }

  // 3b. Case-study detail — posts attached to a case-studies page config,
  //     rendered with the case-study template when marked ?type=case-studies
  if (contentTypeOf(sp) === "case-studies") {
    const apiCaseStudy = await fetchPublicCaseStudyBySlug(endingSlug);
    if (apiCaseStudy) { return <CaseStudyDetailPage post={apiCaseStudy.post} related={apiCaseStudy.related} locale={locale} />; }
    return notFound();
  }

  // 4. News post detail — posts created under /admin/posts render here
  const post = getPostBySlug(endingSlug);
  if (post) { return <PostDetailPage post={post} related={getRelatedPosts(post.slug)} locale={locale} />; }

  const apiPost = await fetchPublicPostBySlug(endingSlug);
  if (apiPost) { return <PostDetailPage post={apiPost.post} related={apiPost.related} locale={locale} />; }

  return notFound();
}
