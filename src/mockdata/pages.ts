/**
 * Static page registry data.
 *
 * Pages are hardcoded layouts composed of sections. They are resolved by the
 * LAST path segment — like vcci-news — so `/solutions/x`, `/a/b/x` all render
 * the page registered for `x`. The component map itself lives in
 * `app/[locale]/(main)/[...slug]/page-registry.tsx`; this file holds the
 * slug → metadata data used for SEO on resolved routes.
 */

export interface StaticPageMeta {
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
  descriptionEn: string;
}

export const STATIC_PAGE_SLUGS: Record<string, StaticPageMeta> = {
  about: {
    titleVi: "Về MeU",
    titleEn: "About MeU",
    descriptionVi: "MeU Solutions — cách chúng tôi làm việc, đội ngũ và câu chuyện phát triển.",
    descriptionEn: "MeU Solutions — how we work, our team and our story.",
  },
  story: {
    titleVi: "Câu chuyện MeU",
    titleEn: "Our Story",
    descriptionVi: "Hành trình hình thành và phát triển của MeU Solutions.",
    descriptionEn: "The journey behind MeU Solutions.",
  },
  "vision-mission": {
    titleVi: "Tầm nhìn | Sứ mệnh | Giá trị cốt lõi",
    titleEn: "Vision | Mission | Core Values",
    descriptionVi: "Tầm nhìn, sứ mệnh và các giá trị cốt lõi định hướng MeU Solutions.",
    descriptionEn: "The vision, mission and core values guiding MeU Solutions.",
  },
  leadership: {
    titleVi: "Ban lãnh đạo",
    titleEn: "Leadership",
    descriptionVi: "Đội ngũ lãnh đạo và chuyên gia công nghệ của MeU Solutions.",
    descriptionEn: "The leadership and technology experts of MeU Solutions.",
  },
  "partners-clients": {
    titleVi: "Đối tác & Khách hàng",
    titleEn: "Partners & Clients",
    descriptionVi: "Các đối tác và khách hàng đã đồng hành cùng MeU Solutions.",
    descriptionEn: "Partners and clients who work with MeU Solutions.",
  },
  locations: {
    titleVi: "Địa điểm",
    titleEn: "Locations",
    descriptionVi: "Văn phòng và điểm hiện diện của MeU Solutions.",
    descriptionEn: "MeU Solutions offices and locations.",
  },
  careers: {
    titleVi: "Tuyển dụng",
    titleEn: "Careers",
    descriptionVi: "Cơ hội nghề nghiệp và môi trường làm việc tại MeU Solutions.",
    descriptionEn: "Career opportunities and life at MeU Solutions.",
  },
  contact: {
    titleVi: "Liên hệ",
    titleEn: "Contact",
    descriptionVi: "Liên hệ đội ngũ MeU Solutions — bắt đầu cuộc trò chuyện về dự án của bạn.",
    descriptionEn: "Contact the MeU Solutions team — start a conversation about your project.",
  },
  "case-studies": {
    titleVi: "Case Studies",
    titleEn: "Case Studies",
    descriptionVi: "Bài toán, giải pháp và kết quả đo lường từ các dự án MeU triển khai.",
    descriptionEn: "Challenges, solutions and measured outcomes from MeU deliveries.",
  },
  featured: {
    titleVi: "Case studies nổi bật",
    titleEn: "Featured Case Studies",
    descriptionVi: "Những dự án tiêu biểu nhất của MeU Solutions.",
    descriptionEn: "The most representative MeU Solutions projects.",
  },
  solution: {
    titleVi: "Case studies theo giải pháp",
    titleEn: "Case Studies by Solution",
    descriptionVi: "Dự án theo nhóm giải pháp MeU Solutions triển khai.",
    descriptionEn: "Projects grouped by the solutions MeU delivers.",
  },
  technology: {
    titleVi: "Case studies theo công nghệ",
    titleEn: "Case Studies by Technology",
    descriptionVi: "Dự án theo công nghệ MeU Solutions sử dụng.",
    descriptionEn: "Projects grouped by the technologies MeU uses.",
  },
  industries: {
    titleVi: "Ngành",
    titleEn: "Industries",
    descriptionVi: "MeU triển khai trong những ngành có chuyên môn thực tế và minh chứng bàn giao.",
    descriptionEn: "MeU delivers in industries with proven domain expertise and delivery evidence.",
  },
  healthcare: {
    titleVi: "Y tế",
    titleEn: "Healthcare",
    descriptionVi: "Số hóa quy trình, nâng cao trải nghiệm y tế cho bệnh viện và phòng khám.",
    descriptionEn: "Digitising processes and elevating patient experience for hospitals and clinics.",
  },
  "logistics-supply-chain": {
    titleVi: "Logistics & Chuỗi cung ứng",
    titleEn: "Logistics & Supply Chain",
    descriptionVi: "Kết nối hệ thống, đồng bộ vận hành chuỗi cung ứng.",
    descriptionEn: "Connecting systems and synchronising supply chain operations.",
  },
  "retail-commerce": {
    titleVi: "Bán lẻ & Thương mại",
    titleEn: "Retail & Commerce",
    descriptionVi: "Kết nối bán hàng, khách hàng và vận hành trên nền tảng số.",
    descriptionEn: "Connecting sales, customers and operations on digital platforms.",
  },
  "pharmaceutical-life-sciences": {
    titleVi: "Dược phẩm & Khoa học sự sống",
    titleEn: "Pharmaceutical & Life Sciences",
    descriptionVi: "Giải pháp số cho doanh nghiệp dược phẩm và khoa học sự sống.",
    descriptionEn: "Digital solutions for pharmaceutical and life sciences organisations.",
  },
  "education-training": {
    titleVi: "Giáo dục & Đào tạo",
    titleEn: "Education & Training",
    descriptionVi: "Số hóa quản lý, kết nối học viên và vận hành đào tạo.",
    descriptionEn: "Digitising management, connecting learners and running training operations.",
  },
  "associations-organizations": {
    titleVi: "Hiệp hội & Tổ chức",
    titleEn: "Associations & Organizations",
    descriptionVi: "Kết nối thành viên, số hóa hoạt động và quản lý thông tin.",
    descriptionEn: "Connecting members, digitising activities and information management.",
  },
  insights: {
    titleVi: "Insights",
    titleEn: "Insights",
    descriptionVi: "Góc nhìn thực tế cho lãnh đạo ra quyết định công nghệ.",
    descriptionEn: "Practical perspective for leaders making technology decisions.",
  },
  "ai-automation": {
    titleVi: "AI & Tự động hóa",
    titleEn: "AI & Automation",
    descriptionVi: "Ứng dụng AI và automation vào vận hành doanh nghiệp.",
    descriptionEn: "Applying AI and automation to business operations.",
  },
  "digital-transformation": {
    titleVi: "Chuyển đổi số toàn diện",
    titleEn: "End-to-end Digital Transformation",
    descriptionVi: "Lộ trình, nền tảng và áp dụng — chuyển đổi số đo được bằng kết quả.",
    descriptionEn: "Roadmap, platforms and adoption — transformation measured by outcomes.",
  },
  "enterprise-tech": {
    titleVi: "Công nghệ doanh nghiệp",
    titleEn: "Enterprise Technology",
    descriptionVi: "Công nghệ nền tảng cho vận hành doanh nghiệp hiện đại.",
    descriptionEn: "Platform technology for modern enterprise operations.",
  },
  industry: {
    titleVi: "Insights ngành",
    titleEn: "Industry Insights",
    descriptionVi: "Phân tích và kinh nghiệm theo từng ngành MeU phục vụ.",
    descriptionEn: "Analysis and experience across the industries MeU serves.",
  },
  news: {
    titleVi: "Tin tức & Sự kiện",
    titleEn: "News & Events",
    descriptionVi: "Tin tức, sự kiện và cập nhật mới nhất từ MeU Solutions.",
    descriptionEn: "News, events and the latest updates from MeU Solutions.",
  },
  reports: {
    titleVi: "Báo cáo & Whitepaper",
    titleEn: "Reports & Whitepapers",
    descriptionVi: "Báo cáo nghiên cứu và tài liệu chuyên sâu từ MeU Solutions.",
    descriptionEn: "Research reports and in-depth papers from MeU Solutions.",
  },
  "software-engineering": {
    titleVi: "Kỹ thuật phần mềm",
    titleEn: "Software Engineering",
    descriptionVi: "Kỹ thuật phần mềm hiện đại — kiến trúc, chất lượng và bàn giao.",
    descriptionEn: "Modern software engineering — architecture, quality and delivery.",
  },
  products: {
    titleVi: "Sản phẩm & Nền tảng",
    titleEn: "Products & Platforms",
    descriptionVi: "Hệ sinh thái sản phẩm MeOS và các nền tảng công nghệ MeU.",
    descriptionEn: "The MeOS product ecosystem and MeU technology platforms.",
  },
  ai: {
    titleVi: "MeOS AI",
    titleEn: "MeOS AI",
    descriptionVi: "Năng lực AI trong hệ sinh thái sản phẩm MeOS.",
    descriptionEn: "AI capabilities inside the MeOS product ecosystem.",
  },
  commerce: {
    titleVi: "MeOS Ecommerce",
    titleEn: "MeOS Ecommerce",
    descriptionVi: "Nền tảng thương mại điện tử trong hệ sinh thái MeOS.",
    descriptionEn: "The commerce platform inside the MeOS ecosystem.",
  },
  enterprise: {
    titleVi: "Nền tảng quản trị doanh nghiệp",
    titleEn: "Enterprise Operations Platform",
    descriptionVi: "Phần mềm doanh nghiệp dạng module — workflow, CRM, analytics và membership trên một lớp dữ liệu dùng chung.",
    descriptionEn: "Modular business software — workflow, CRM, analytics and membership on one shared data layer.",
  },
  "meos-ecosystem": {
    titleVi: "MeOS - Hệ sinh thái giải pháp công nghệ",
    titleEn: "MeOS - Technology Solution Ecosystem",
    descriptionVi: "Khám phá hệ sinh thái công nghệ MeOS do MeU Solutions phát triển, với các giải pháp thương mại điện tử, Mini App, bán hàng đa kênh và y tế.",
    descriptionEn: "Explore the MeOS technology ecosystem by MeU Solutions — e-commerce, Mini App, omnichannel sales and healthcare solutions.",
  },
  "meos-ecommerce": {
    titleVi: "MeOS Ecommerce - Giải pháp thương mại điện tử cho doanh nghiệp",
    titleEn: "MeOS Ecommerce - E-commerce Solution for Business",
    descriptionVi: "Khám phá MeOS Ecommerce, giải pháp hỗ trợ doanh nghiệp xây dựng website bán hàng trực tuyến, tổ chức hoạt động kinh doanh và phát triển trải nghiệm mua sắm.",
    descriptionEn: "Discover MeOS Ecommerce — the solution that helps businesses build an online storefront, organise commerce operations and develop the shopping experience.",
  },
  "meos-miniapp": {
    titleVi: "MeOS Mini App - Trải nghiệm dịch vụ trên Mini App",
    titleEn: "MeOS Mini App - Service Experiences on Mini App",
    descriptionVi: "MeOS Mini App là giải pháp phát triển trải nghiệm dịch vụ và kết nối khách hàng trên nền tảng Mini App — bán hàng, loyalty, voucher và affiliate.",
    descriptionEn: "MeOS Mini App builds service experiences and customer engagement on Mini App platforms — sales, loyalty, vouchers and affiliate.",
  },
  "meos-omni": {
    titleVi: "MeOS Omni - Quản lý bán hàng đa kênh",
    titleEn: "MeOS Omni - Multichannel Sales Management",
    descriptionVi: "MeOS Omni hướng đến quản lý tập trung các hoạt động bán hàng trên nhiều kênh kinh doanh: cửa hàng, website, sàn thương mại điện tử và kênh xã hội.",
    descriptionEn: "MeOS Omni centrally manages sales across channels: stores, websites, marketplaces and social channels.",
  },
  "meos-hicare": {
    titleVi: "MeOS HiCare - Giải pháp quản lý y tế thông minh",
    titleEn: "MeOS HiCare - Smart Healthcare Management",
    descriptionVi: "MeOS HiCare là giải pháp công nghệ hướng đến số hóa quy trình và trải nghiệm dịch vụ y tế, hỗ trợ cơ sở y tế tổ chức hoạt động và chăm sóc người bệnh.",
    descriptionEn: "MeOS HiCare digitises healthcare workflows and service experiences, helping facilities organise operations and patient care.",
  },
  solutions: {
    titleVi: "Giải pháp",
    titleEn: "Solutions",
    descriptionVi: "Giải pháp doanh nghiệp, năng lực công nghệ và nhân sự từ MeU Solutions.",
    descriptionEn: "Business solutions, technology capabilities and enablement from MeU Solutions.",
  },
  "ai-consulting": {
    titleVi: "Tư vấn ứng dụng AI",
    titleEn: "AI Application Consulting",
    descriptionVi: "Đồng hành xác định, thiết kế và triển khai ứng dụng AI phù hợp cho doanh nghiệp.",
    descriptionEn: "Identifying, designing and deploying the right AI applications for your business.",
  },
  "ai-engineering": {
    titleVi: "Kỹ thuật AI",
    titleEn: "AI Engineering",
    descriptionVi: "Thiết kế, phát triển và vận hành các hệ thống AI thực tế.",
    descriptionEn: "Designing, building and operating real-world AI systems.",
  },
  "ai-intelligent-automation": {
    titleVi: "AI & Tự động hóa thông minh",
    titleEn: "AI & Intelligent Automation",
    descriptionVi: "Tự động hóa quy trình với AI ở đúng điểm cần xử lý.",
    descriptionEn: "Process automation with AI placed at the right points.",
  },
  "business-process-optimization": {
    titleVi: "Tối ưu quy trình doanh nghiệp",
    titleEn: "Business Process Optimization",
    descriptionVi: "Phân tích và tối ưu quy trình trước khi số hóa.",
    descriptionEn: "Analysing and optimising processes before digitising them.",
  },
  "business-solutions": {
    titleVi: "Giải pháp doanh nghiệp",
    titleEn: "Business Solutions",
    descriptionVi: "Bắt đầu từ nhu cầu cốt lõi của doanh nghiệp bạn.",
    descriptionEn: "Starting from your core business need.",
  },
  "cloud-devops": {
    titleVi: "Cloud & DevOps",
    titleEn: "Cloud & DevOps",
    descriptionVi: "Triển khai, giám sát và vận hành hạ tầng cloud.",
    descriptionEn: "Deploying, monitoring and operating cloud infrastructure.",
  },
  "custom-software-solutions": {
    titleVi: "Giải pháp phần mềm tuỳ chỉnh",
    titleEn: "Custom Software Solutions",
    descriptionVi: "Phần mềm thiết kế theo quy trình riêng của doanh nghiệp.",
    descriptionEn: "Software engineered around your own workflows.",
  },
  "customer-experience": {
    titleVi: "Trải nghiệm khách hàng",
    titleEn: "Customer Experience",
    descriptionVi: "Nền tảng và điểm chạm nâng cao trải nghiệm khách hàng.",
    descriptionEn: "Platforms and touchpoints that elevate customer experience.",
  },
  "digital-commerce": {
    titleVi: "Thương mại điện tử",
    titleEn: "Digital Commerce",
    descriptionVi: "Nền tảng bán hàng trực tuyến đa điểm chạm.",
    descriptionEn: "Multi-touchpoint online commerce platforms.",
  },
  "enterprise-management": {
    titleVi: "Quản trị doanh nghiệp",
    titleEn: "Enterprise Management",
    descriptionVi: "Quy trình, dữ liệu và báo cáo thống nhất xuyên suốt tổ chức.",
    descriptionEn: "Unified processes, data and reporting across the organisation.",
  },
  "it-talent-solutions": {
    titleVi: "Giải pháp nhân sự IT",
    titleEn: "IT Talent Solutions",
    descriptionVi: "Bổ sung năng lực đội ngũ với kỹ sư phần mềm chuyên trách.",
    descriptionEn: "Extending your team with dedicated software engineers.",
  },
  "maintenance-managed-services": {
    titleVi: "Vận hành & Bảo trì",
    titleEn: "Maintenance & Managed Services",
    descriptionVi: "Duy trì, giám sát và phát triển hệ thống sau triển khai.",
    descriptionEn: "Maintaining, monitoring and evolving systems after launch.",
  },
  "product-ui-ux-design": {
    titleVi: "Thiết kế UI/UX sản phẩm",
    titleEn: "Product UI/UX Design",
    descriptionVi: "Thiết kế trải nghiệm sản phẩm dẫn dắt bởi mục tiêu kinh doanh.",
    descriptionEn: "Product experience design driven by business goals.",
  },
  "quality-engineering": {
    titleVi: "Đảm bảo chất lượng",
    titleEn: "Quality Engineering",
    descriptionVi: "Kiểm thử và đảm bảo chất lượng xuyên suốt vòng đời sản phẩm.",
    descriptionEn: "Testing and quality assurance across the product lifecycle.",
  },
  "system-integration": {
    titleVi: "Tích hợp hệ thống",
    titleEn: "System Integration",
    descriptionVi: "Kết nối các nền tảng và hệ thống thành một luồng vận hành.",
    descriptionEn: "Connecting platforms and systems into one operating flow.",
  },
  "talent-enablement": {
    titleVi: "Nhân sự & Đào tạo",
    titleEn: "Talent & Enablement",
    descriptionVi: "Phát triển năng lực đội ngũ và đào tạo công nghệ.",
    descriptionEn: "Building team capability and technology training.",
  },
  "technology-capabilities": {
    titleVi: "Năng lực công nghệ",
    titleEn: "Technology Capabilities",
    descriptionVi: "Phương thức các quy trình được kiến tạo, kết nối và vận hành.",
    descriptionEn: "How processes are designed, built, connected and operated.",
  },
  "technology-consulting": {
    titleVi: "Tư vấn công nghệ",
    titleEn: "Technology Consulting",
    descriptionVi: "Tư vấn kiến trúc, lựa chọn công nghệ và lộ trình triển khai.",
    descriptionEn: "Advisory on architecture, technology choices and delivery roadmaps.",
  },
  "technology-training": {
    titleVi: "Đào tạo công nghệ",
    titleEn: "Technology Training",
    descriptionVi: "Chương trình đào tạo công nghệ cho đội ngũ doanh nghiệp.",
    descriptionEn: "Technology training programs for enterprise teams.",
  },
  "website-operations": {
    titleVi: "Vận hành & Quản lý Website",
    titleEn: "Website Operations & Management",
    descriptionVi: "Vận hành, giám sát và cải tiến website liên tục.",
    descriptionEn: "Operating, monitoring and continuously improving your website.",
  },
  trust: {
    titleVi: "Trust Center",
    titleEn: "Trust Center",
    descriptionVi: "Cách MeU bảo vệ dữ liệu, quyền riêng tư và triển khai AI.",
    descriptionEn: "How MeU protects your data, privacy and AI deployments.",
  },
  "cookie-policy": {
    titleVi: "Chính sách Cookie",
    titleEn: "Cookie Policy",
    descriptionVi: "Chính sách sử dụng cookie trên website MeU Solutions.",
    descriptionEn: "How cookies are used on the MeU Solutions website.",
  },
  "data-protection": {
    titleVi: "Bảo vệ dữ liệu",
    titleEn: "Data Protection",
    descriptionVi: "Cam kết và quy trình bảo vệ dữ liệu của MeU Solutions.",
    descriptionEn: "MeU Solutions data protection commitments and processes.",
  },
  privacy: {
    titleVi: "Quyền riêng tư",
    titleEn: "Privacy",
    descriptionVi: "Chính sách quyền riêng tư của MeU Solutions.",
    descriptionEn: "The MeU Solutions privacy policy.",
  },
  "responsible-ai": {
    titleVi: "AI có trách nhiệm",
    titleEn: "Responsible AI",
    descriptionVi: "Nguyên tắc MeU áp dụng khi triển khai AI cho khách hàng.",
    descriptionEn: "The principles MeU applies when deploying AI for clients.",
  },
  security: {
    titleVi: "Bảo mật",
    titleEn: "Security",
    descriptionVi: "Thực hành và kiểm soát bảo mật tại MeU Solutions.",
    descriptionEn: "Security practices and controls at MeU Solutions.",
  },
  "terms-of-use": {
    titleVi: "Điều khoản sử dụng",
    titleEn: "Terms of Use",
    descriptionVi: "Điều khoản sử dụng website và dịch vụ MeU Solutions.",
    descriptionEn: "Terms governing use of MeU Solutions website and services.",
  },
};

export function getStaticPageMeta(slug: string): StaticPageMeta | null {
  return STATIC_PAGE_SLUGS[slug] ?? null;
}
