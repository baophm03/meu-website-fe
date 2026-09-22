export type MegaLink = { label: string; labelKey?: string; href: string };
export type FooterColumn = { heading: string; headingKey?: string; links: MegaLink[] };

export const footerColumns: FooterColumn[] = [
  {
    heading: "What We Do",
    headingKey: "nav.whatWeDo",
    links: [
      { label: "Digital Transformation", labelKey: "mega.digitalTransformation", href: "/solutions/digital-transformation" },
      { label: "Enterprise Management", labelKey: "mega.enterpriseManagement", href: "/solutions/enterprise-management" },
      { label: "Technology Consulting", labelKey: "mega.techConsulting", href: "/solutions/technology-consulting" },
      { label: "AI Application Consulting", labelKey: "mega.aiConsulting", href: "/solutions/ai-consulting" },
      { label: "IT Talent Solutions", labelKey: "mega.itTalentSolutions", href: "/solutions/it-talent-solutions" },
      { label: "Technology Training", labelKey: "mega.techTraining", href: "/solutions/technology-training" },
    ],
  },
  {
    heading: "Industries we work in",
    headingKey: "mega.industriesWeWorkIn",
    links: [
      { label: "Healthcare", labelKey: "mega.healthcare", href: "/industries/healthcare" },
      { label: "Logistics & Supply Chain", labelKey: "mega.logisticsSupply", href: "/industries/logistics-supply-chain" },
      { label: "Retail & Commerce", labelKey: "mega.retailCommerce", href: "/industries/retail-commerce" },
      { label: "Pharmaceutical & Life Sciences", labelKey: "mega.pharmaLifeSciences", href: "/industries/pharmaceutical-life-sciences" },
      { label: "Education & Training", labelKey: "mega.educationTraining", href: "/industries/education-training" },
      { label: "Associations & Organizations", labelKey: "mega.associationsOrgs", href: "/industries/associations-organizations" },
    ],
  },
  {
    heading: "MeOS Universe",
    headingKey: "mega.meosUniverse",
    links: [
      { label: "MeOS 365", labelKey: "mega.meos365", href: "/products/meos-365" },
      { label: "MeOS Ecommerce", labelKey: "mega.meosEcommerce", href: "/products/meos-ecommerce" },
      { label: "MeOS MiniApp", labelKey: "mega.meosMiniApp", href: "/products/meos-miniapp" },
      { label: "MeOS Omni", labelKey: "mega.meosOmni", href: "/products/meos-omni" },
      { label: "MeOS", labelKey: "mega.meos", href: "/products/meos" },
    ],
  },
  {
    heading: "Client Success",
    headingKey: "mega.clientSuccess",
    links: [
      { label: "Featured Case Studies", labelKey: "mega.featuredCaseStudies", href: "/case-studies/featured" },
      { label: "By Industry", labelKey: "mega.byIndustry", href: "/case-studies/industry" },
      { label: "By Solution", labelKey: "mega.bySolution", href: "/case-studies/solution" },
      { label: "By Technology", labelKey: "mega.byTechnology", href: "/case-studies/technology" },
    ],
  },
  {
    heading: "Insights",
    headingKey: "mega.insights",
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
  {
    heading: "About MeU",
    headingKey: "mega.aboutMeu",
    links: [
      { label: "About Us", labelKey: "mega.aboutUs", href: "/about/us" },
      { label: "Vision | Mission | Core Values", labelKey: "mega.visionMission", href: "/about/vision-mission" },
      { label: "Partners & Clients", labelKey: "mega.partnersClients", href: "/about/partners-clients" },
      { label: "Careers", labelKey: "mega.careers", href: "/about/careers" },
      { label: "Contact", labelKey: "mega.contact", href: "/contact" },
    ],
  },
  {
    heading: "Trust Center",
    headingKey: "mega.trustCenter",
    links: [
      { label: "Security", labelKey: "mega.security", href: "/trust/security" },
      { label: "Privacy", labelKey: "mega.privacy", href: "/trust/privacy" },
      { label: "Data Protection", labelKey: "mega.dataProtection", href: "/trust/data-protection" },
      { label: "Responsible AI", labelKey: "mega.responsibleAi", href: "/trust/responsible-ai" },
    ],
  },
];
