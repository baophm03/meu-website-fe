export type MegaLink = { label: string; labelKey?: string; href: string };
export type MegaColumn = { heading: string; headingKey?: string; blurb: string; blurbKey?: string; links: MegaLink[] };
export type NavItem = {
  label: string;
  labelKey?: string;
  href: string;
  columns?: MegaColumn[];
  featured?: { eyebrow: string; title: string; body: string; href: string; cta: string };
};

const businessSolutions: MegaColumn = {
  heading: "Business Solutions",
  headingKey: "mega.businessSolutions",
  blurb: "Start from the outcome you need in the operation.",
  blurbKey: "mega.businessSolutionsBlurb",
  links: [
    { label: "Digital Transformation", labelKey: "mega.digitalTransformation", href: "/solutions/digital-transformation" },
    { label: "Enterprise Management", labelKey: "mega.enterpriseManagement", href: "/solutions/enterprise-management" },
    { label: "Custom Software Solutions", labelKey: "mega.customSoftware", href: "/solutions/custom-software-solutions" },
    { label: "MeOS Ecosystem", labelKey: "mega.meosEcosystem", href: "/products/meos" },
    { label: "Website Operations", labelKey: "mega.websiteOperations", href: "/solutions/website-operations" },
  ],
};

const technologyCapabilities: MegaColumn = {
  heading: "Technology Capabilities",
  headingKey: "mega.techCapabilities",
  blurb: "How the work gets designed, built, integrated and operated.",
  blurbKey: "mega.techCapabilitiesBlurb",
  links: [
    { label: "Technology Consulting", labelKey: "mega.techConsulting", href: "/solutions/technology-consulting" },
    { label: "AI Application Consulting", labelKey: "mega.aiConsulting", href: "/solutions/ai-consulting" },
    { label: "System Integration", labelKey: "mega.systemIntegration", href: "/solutions/system-integration" },
    { label: "Maintenance & Managed Services", labelKey: "mega.maintenanceManaged", href: "/solutions/maintenance-managed-services" },
    { label: "Cloud & DevOps", labelKey: "mega.cloudDevops", href: "/solutions/cloud-devops" },
  ],
};

const talentEnablement: MegaColumn = {
  heading: "Talent & Enablement",
  headingKey: "mega.talentEnablement",
  blurb: "Add capacity to your teams, or grow the people you already have.",
  blurbKey: "mega.talentEnablementBlurb",
  links: [
    { label: "IT Talent Solutions", labelKey: "mega.itTalentSolutions", href: "/solutions/it-talent-solutions" },
    { label: "Technology Training", labelKey: "mega.techTraining", href: "/solutions/technology-training" },
  ],
};

export const industries: MegaLink[] = [
  { label: "Healthcare", labelKey: "mega.healthcare", href: "/industries/healthcare" },
  { label: "Logistics & Supply Chain", labelKey: "mega.logisticsSupply", href: "/industries/logistics-supply-chain" },
  { label: "Retail & Commerce", labelKey: "mega.retailCommerce", href: "/industries/retail-commerce" },
  { label: "Pharmaceutical & Life Sciences", labelKey: "mega.pharmaLifeSciences", href: "/industries/pharmaceutical-life-sciences" },
  { label: "Education & Training", labelKey: "mega.educationTraining", href: "/industries/education-training" },
  { label: "Associations & Organizations", labelKey: "mega.associationsOrgs", href: "/industries/associations-organizations" },
];

export const navigation: NavItem[] = [
  {
    label: "What We Do",
    labelKey: "nav.whatWeDo",
    href: "/solutions",
    columns: [businessSolutions, technologyCapabilities, talentEnablement],
  },
  {
    label: "Industries",
    labelKey: "nav.industries",
    href: "/industries",
    columns: [
      {
        heading: "Industries we work in",
        headingKey: "mega.industriesWeWorkIn",
        blurb: "Only sectors with validated domain knowledge and delivery evidence.",
        blurbKey: "mega.industriesWeWorkInBlurb",
        links: industries,
      },
    ],
  },
  {
    label: "Products & Platforms",
    labelKey: "nav.products",
    href: "/products",
    columns: [
      {
        heading: "MeOS Universe",
        headingKey: "mega.meosUniverse",
        blurb: "One ecosystem — diverse solutions — comprehensive capabilities. Productised platforms with a stable roadmap and a live demo.",
        blurbKey: "mega.meosUniverseBlurb",
        links: [
          { label: "MeOS 365", labelKey: "mega.meos365", href: "/products/meos-365" },
          { label: "MeOS Ecommerce", labelKey: "mega.meosEcommerce", href: "/products/meos-ecommerce" },
          { label: "MeOS MiniApp", labelKey: "mega.meosMiniApp", href: "/products/meos-miniapp" },
          { label: "MeOS Omni", labelKey: "mega.meosOmni", href: "/products/meos-omni" },
          { label: "MeOS", labelKey: "mega.meos", href: "/products/meos" },
        ],
      },
    ],
  },
  {
    label: "Client Success",
    labelKey: "nav.clientSuccess",
    href: "/case-studies",
    columns: [
      {
        heading: "Client Success",
        headingKey: "mega.clientSuccess",
        blurb: "Challenge, solution and measured impact — filtered the way you buy.",
        blurbKey: "mega.clientSuccessBlurb",
        links: [
          { label: "Featured Case Studies", labelKey: "mega.featuredCaseStudies", href: "/case-studies/featured" },
          { label: "By Industry", labelKey: "mega.byIndustry", href: "/case-studies/industry" },
          { label: "By Solution", labelKey: "mega.bySolution", href: "/case-studies/solution" },
          { label: "By Technology", labelKey: "mega.byTechnology", href: "/case-studies/technology" },
        ],
      },
    ],
  },
  {
    label: "Insights",
    labelKey: "nav.insights",
    href: "/insights",
    columns: [
      {
        heading: "Insights",
        headingKey: "mega.insights",
        blurb: "Practical perspective for leaders making technology decisions.",
        blurbKey: "mega.insightsBlurb",
        links: [
          { label: "AI & Automation", labelKey: "mega.insightsAiAutomation", href: "/insights/ai-automation" },
          { label: "Digital Transformation", labelKey: "mega.insightsDigitalTrans", href: "/insights/digital-transformation" },
          { label: "Enterprise Technology", labelKey: "mega.enterpriseTech", href: "/insights/enterprise-tech" },
          { label: "Software Engineering", labelKey: "mega.insightsSoftwareEng", href: "/insights/software-engineering" },
          { label: "Industry Insights", labelKey: "mega.industryInsights", href: "/insights/industry" },
          { label: "Reports & Whitepapers", labelKey: "mega.reportsWhitepapers", href: "/insights/reports" },
          { label: "News & Events", labelKey: "mega.newsEvents", href: "/insights/news" },
        ],
      },
    ],
  },
  {
    label: "About MeU",
    labelKey: "nav.about",
    href: "/about",
    columns: [
      {
        heading: "About MeU",
        headingKey: "mega.aboutMeu",
        blurb: "Who we are and how we work.",
        blurbKey: "mega.aboutMeuBlurb",
        links: [
          { label: "About Us", labelKey: "mega.aboutUs", href: "/about/us" },
          { label: "Vision | Mission | Core Values", labelKey: "mega.visionMission", href: "/about/vision-mission" },
          { label: "Partners & Clients", labelKey: "mega.partnersClients", href: "/about/partners-clients" },
          { label: "Careers", labelKey: "mega.careers", href: "/about/careers" },
          { label: "Contact", labelKey: "mega.contact", href: "/contact" },
        ],
      },
    ],
  },
  {
    label: "Trust Center",
    labelKey: "nav.trustCenter",
    href: "/trust",
    columns: [
      {
        heading: "Trust Center",
        headingKey: "mega.trustCenter",
        blurb: "How we protect your data, privacy and AI deployments.",
        blurbKey: "mega.trustCenterBlurb",
        links: [
          { label: "Security", labelKey: "mega.security", href: "/trust/security" },
          { label: "Privacy", labelKey: "mega.privacy", href: "/trust/privacy" },
          { label: "Data Protection", labelKey: "mega.dataProtection", href: "/trust/data-protection" },
          { label: "Responsible AI", labelKey: "mega.responsibleAi", href: "/trust/responsible-ai" },
        ],
      },
    ],
  },
];
