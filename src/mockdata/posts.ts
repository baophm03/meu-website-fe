/**
 * Mock news/post data for the public site.
 *
 * A "page" is a hardcoded layout made of sections — a news post is just one
 * kind of content that can appear inside those sections (or be resolved as a
 * standalone article detail). Posts created in `/admin/posts` will replace this
 * data once the API is wired up.
 */

export interface MockPostSection {
  heading: string;
  headingEn: string;
  body: string;
  bodyEn: string;
}

export interface MockPost {
  slug: string;
  headerConfig: string;
  headerConfigEn: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  image: string;
  publishedAt: string;
  sections: MockPostSection[];
}

export const mockPosts: MockPost[] = [
  {
    slug: "ai-automation-trong-van-hanh-doanh-nghiep",
    headerConfig: "AI & Tự động hóa",
    headerConfigEn: "AI & Automation",
    title: "AI trong vận hành: tự động hóa đúng chỗ, không tự động hóa mọi thứ",
    titleEn: "AI in operations: automate the right things, not everything",
    excerpt:
      "AI tạo ra giá trị khi được đặt vào đúng điểm nghẽn — xử lý dữ liệu, gợi ý quyết định và tự động hóa tác vụ lặp lại — trong khi con người vẫn kiểm soát các bước then chốt.",
    excerptEn:
      "AI creates value when placed at real bottlenecks — processing data, suggesting decisions and automating repetitive work — while people stay in control of critical steps.",
    image: "/images/insights/insight-1.jpg",
    publishedAt: "2025-08-12",
    sections: [
      {
        heading: "Bắt đầu từ điểm nghẽn, không bắt đầu từ công nghệ",
        headingEn: "Start from the bottleneck, not the technology",
        body: "Phần lớn dự án AI thất bại vì bắt đầu bằng mô hình thay vì bắt đầu bằng quy trình. Khi phân tích vận hành thực tế, các điểm nghẽn thường rất cụ thể: nhập liệu thủ công, tổng hợp báo cáo, phân loại yêu cầu khách hàng. Đó là những nơi AI tạo ra hiệu quả đo được ngay.",
        bodyEn:
          "Most AI projects fail because they start with a model instead of a process. When you analyse real operations, bottlenecks are concrete: manual data entry, report consolidation, ticket triage. Those are the places where AI produces measurable wins immediately.",
      },
      {
        heading: "Con người vẫn giữ quyền kiểm soát",
        headingEn: "Humans keep control",
        body: "Trong các hệ thống MeU triển khai, AI xử lý phần lặp lại còn con người phê duyệt phần quan trọng. Kiến trúc human-in-the-loop giúp doanh nghiệp tin dùng hệ thống ngay từ ngày đầu thay vì chờ AI hoàn hảo.",
        bodyEn:
          "In systems MeU deploys, AI handles the repetitive part while people approve the critical part. Human-in-the-loop design lets organisations trust the system from day one instead of waiting for perfect AI.",
      },
      {
        heading: "Đo hiệu quả bằng giờ tiết kiệm và lỗi giảm",
        headingEn: "Measure in hours saved and errors reduced",
        body: "Một automation tốt phải trả lời được hai câu hỏi: tiết kiệm bao nhiêu giờ mỗi tuần và giảm bao nhiêu lỗi dữ liệu. Nếu không đo được, đó là demo — không phải hệ thống vận hành.",
        bodyEn:
          "A good automation answers two questions: how many hours saved per week, and how many data errors removed. If it cannot be measured, it is a demo — not an operating system.",
      },
    ],
  },
  {
    slug: "chuyen-doi-so-toan-dien-lo-trinh-thuc-te",
    headerConfig: "Chuyển đổi số",
    headerConfigEn: "Digital Transformation",
    title: "Chuyển đổi số toàn diện cần lộ trình, không cần big bang",
    titleEn: "End-to-end digital transformation needs a roadmap, not a big bang",
    excerpt:
      "Chuyển đổi số thành công khi được chia thành các giai đoạn nhỏ có kết quả đo được — từ số hóa quy trình lõi đến kết nối dữ liệu và mở rộng nền tảng.",
    excerptEn:
      "Transformation succeeds when broken into small, measurable phases — from digitising core processes to connecting data and scaling the platform.",
    image: "/images/insights/insight-3.jpg",
    publishedAt: "2025-07-28",
    sections: [
      {
        heading: "Giai đoạn một: số hóa quy trình lõi",
        headingEn: "Phase one: digitise the core process",
        body: "Bắt đầu từ quy trình tạo ra giá trị lớn nhất — đơn hàng, hồ sơ, phê duyệt. Số hóa một quy trình tốt hơn là dàn trải mỏng trên mọi thứ. Kết quả đo được tạo niềm tin cho các giai đoạn tiếp theo.",
        bodyEn:
          "Start with the highest-value process — orders, records, approvals. Digitising one process well beats spreading thin across everything. Measurable results buy trust for the next phases.",
      },
      {
        heading: "Giai đoạn hai: kết nối dữ liệu",
        headingEn: "Phase two: connect the data",
        body: "Khi các quy trình đã lên nền tảng số, bước tiếp theo là liên thông dữ liệu — một nguồn đúng cho đơn hàng, khách hàng và báo cáo. Đây là lúc giá trị tích lũy bắt đầu nhân lên.",
        bodyEn:
          "Once processes run on digital platforms, the next step is connecting data — one source of truth for orders, customers and reporting. This is where compounding value begins.",
      },
      {
        heading: "Giai đoạn ba: mở rộng và tối ưu",
        headingEn: "Phase three: scale and optimise",
        body: "Với nền tảng và dữ liệu đã kết nối, doanh nghiệp có thể thêm automation, phân tích và các điểm chạm mới mà không làm vỡ hệ thống hiện có.",
        bodyEn:
          "With platform and data connected, the business can add automation, analytics and new touchpoints without breaking what already works.",
      },
    ],
  },
  {
    slug: "mini-app-kenh-cham-soc-khach-hang-moi",
    headerConfig: "Sản phẩm",
    headerConfigEn: "Products",
    title: "Mini App: kênh chạm khách hàng không cần cài đặt",
    titleEn: "Mini Apps: a customer touchpoint with zero install friction",
    excerpt:
      "Zalo Mini App và các nền tảng tương tự cho phép doanh nghiệp đưa bán hàng, loyalty và chăm sóc khách hàng lên điện thoại người dùng mà không yêu cầu tải ứng dụng.",
    excerptEn:
      "Zalo Mini App and similar platforms let businesses deliver commerce, loyalty and customer care on the phone — no app install required.",
    image: "/images/insights/insight-2.jpg",
    publishedAt: "2025-07-10",
    sections: [
      {
        heading: "Tại sao Mini App phù hợp với thị trường Việt Nam",
        headingEn: "Why Mini Apps fit the Vietnamese market",
        body: "Người dùng Việt Nam sống trong Zalo. Mini App đưa dịch vụ của doanh nghiệp đến đúng nơi khách hàng đã ở — đặt lịch, mua hàng, tích điểm và nhận thông báo trong một ứng dụng họ mở hàng chục lần mỗi ngày.",
        bodyEn:
          "Vietnamese users live inside Zalo. Mini Apps bring your services to where customers already are — booking, shopping, loyalty points and notifications inside an app they open dozens of times a day.",
      },
      {
        heading: "Kết hợp bán hàng và chăm sóc",
        headingEn: "Combining commerce and care",
        body: "Trong các dự án như Noni4x hay Y khoa Vạn Hạnh, Mini App không chỉ là kênh bán — nó là nơi khách hàng theo dõi đơn hàng, nhận voucher, tra sổ sức khỏe và tương tác với thương hiệu liên tục.",
        bodyEn:
          "In projects like Noni4x or Van Hanh Medical, the Mini App is not just a sales channel — it is where customers track orders, receive vouchers, check health records and keep interacting with the brand.",
      },
      {
        heading: "Chi phí vận hành thấp hơn app native",
        headingEn: "Lower operating cost than native apps",
        body: "Không cần hai codebase iOS/Android, không cần thuyết phục người dùng cài đặt. Một nền tảng Mini App được duy trì tập trung và phát triển tính năng nhanh hơn.",
        bodyEn:
          "No dual iOS/Android codebase, no convincing users to install. A Mini App platform is maintained centrally and ships features faster.",
      },
    ],
  },
  {
    slug: "he-sinh-thai-meos-cap-nhat",
    headerConfig: "MeOS",
    headerConfigEn: "MeOS",
    title: "Hệ sinh thái MeOS: một nền tảng, nhiều sản phẩm kết nối",
    titleEn: "The MeOS ecosystem: one platform, many connected products",
    excerpt:
      "MeOS Ecommerce, MeOS MiniApp, MeOS Omni và MeOS HiCare được thiết kế để chia sẻ dữ liệu và quy trình — triển khai từng phần, mở rộng khi cần.",
    excerptEn:
      "MeOS Ecommerce, MeOS MiniApp, MeOS Omni and MeOS HiCare are designed to share data and workflows — deploy incrementally, expand when needed.",
    image: "/images/insights/insight-4.jpg",
    publishedAt: "2025-06-20",
    sections: [
      {
        heading: "Triết lý một nền tảng",
        headingEn: "The one-platform philosophy",
        body: "Thay vì mỗi nhu cầu một phần mềm riêng lẻ, MeOS thiết kế các sản phẩm dùng chung hạ tầng dữ liệu. Khách hàng, đơn hàng và hoạt động được nhìn thống nhất trên toàn hệ thống.",
        bodyEn:
          "Instead of a separate tool per need, MeOS products share one data foundation. Customers, orders and activity are seen consistently across the whole system.",
      },
      {
        heading: "Triển khai theo từng module",
        headingEn: "Deploy module by module",
        body: "Doanh nghiệp không cần mua cả hệ sinh thái. Bắt đầu với module sát bài toán nhất — quản trị nội bộ, thương mại hay mini app — rồi mở rộng khi quy mô tăng.",
        bodyEn:
          "Businesses do not buy the whole ecosystem. Start with the module closest to the problem — internal management, commerce or mini app — then expand as scale grows.",
      },
      {
        heading: "Demo trực tiếp, lộ trình rõ ràng",
        headingEn: "Live demos, clear roadmaps",
        body: "Mỗi sản phẩm trong MeOS có demo chạy thật và roadmap công khai — giúp khách hàng đánh giá trước khi cam kết triển khai.",
        bodyEn:
          "Every MeOS product ships with a real demo and a public roadmap — so customers can evaluate before committing to deployment.",
      },
    ],
  },
  {
    slug: "erp-quan-tri-doanh-nghiep-tap-trung",
    headerConfig: "Quản trị doanh nghiệp",
    headerConfigEn: "Enterprise Management",
    title: "Quản trị tập trung: một nguồn đúng cho toàn tổ chức",
    titleEn: "Centralised management: one source of truth for the organisation",
    excerpt:
      "Khi nhân sự, tài chính, kho và khách hàng nằm trên một hệ thống, báo cáo ngừng là cuộc tổng hợp thủ công cuối tháng.",
    excerptEn:
      "When people, finance, inventory and customers live on one system, reporting stops being an end-of-month manual exercise.",
    image: "/images/insights/insight-5.jpg",
    publishedAt: "2025-06-05",
    sections: [
      {
        heading: "Vấn đề của dữ liệu phân tán",
        headingEn: "The problem with scattered data",
        body: "Mỗi phòng ban một file Excel là mỗi phiên bản sự thật. Khi số liệu không khớp, cuộc họp biến thành tranh luận về file nào đúng thay vì quyết định kinh doanh.",
        bodyEn:
          "Every department with its own spreadsheet is its own version of the truth. When numbers disagree, meetings turn into arguments about which file is right instead of business decisions.",
      },
      {
        heading: "Quy trình trước, phần mềm sau",
        headingEn: "Process first, software second",
        body: "Hệ thống quản trị chỉ chạy tốt khi quy trình được chuẩn hóa trước. MeU bắt đầu bằng phân tích nghiệp vụ, rồi mới thiết kế hệ thống phản ánh đúng cách tổ chức vận hành.",
        bodyEn:
          "A management system only works when processes are standardised first. MeU starts with business analysis, then designs a system that mirrors how the organisation actually operates.",
      },
      {
        heading: "Báo cáo là hệ quả, không phải tính năng",
        headingEn: "Reporting is a consequence, not a feature",
        body: "Khi dữ liệu được nhập đúng một lần ở nguồn, mọi báo cáo — doanh thu, tồn kho, hiệu suất — tự động đúng. Không còn tổng hợp tay, không còn phiên bản V2_final_final.",
        bodyEn:
          "When data is entered correctly once at the source, every report — revenue, inventory, performance — is automatically right. No more manual consolidation, no more V2_final_final files.",
      },
    ],
  },
  {
    slug: "so-hoa-quy-trinh-tuyen-sinh",
    headerConfig: "Giáo dục",
    headerConfigEn: "Education",
    title: "Số hóa tuyển sinh: từ biểu mẫu rời rạc đến một luồng dữ liệu",
    titleEn: "Digitising admissions: from scattered forms to one data flow",
    excerpt:
      "Thông tin đăng ký từ website, mạng xã hội và tư vấn viên cần chảy về một hệ thống — thay vì được tổng hợp thủ công vào cuối ngày.",
    excerptEn:
      "Registrations from the website, social channels and consultants need to flow into one system — instead of being manually consolidated at the end of the day.",
    image: "/images/insights/insight-6.jpg",
    publishedAt: "2025-05-22",
    sections: [
      {
        heading: "Một điểm tiếp nhận duy nhất",
        headingEn: "A single intake point",
        body: "Dù học viên đăng ký từ landing page, fanpage hay gọi điện, thông tin đều vào cùng một hệ thống với trạng thái xử lý rõ ràng — không còn lead bị bỏ sót trong hộp chat.",
        bodyEn:
          "Whether a student registers via landing page, fanpage or phone call, information lands in one system with clear processing status — no more leads lost in chat inboxes.",
      },
      {
        heading: "Tự động hóa phần lặp lại",
        headingEn: "Automate the repetitive parts",
        body: "Xác nhận đăng ký, nhắc lịch tư vấn, thông báo khai giảng — các tác vụ có quy tắc rõ ràng được tự động hóa để đội tuyển sinh tập trung vào tư vấn thật.",
        bodyEn:
          "Registration confirmations, consultation reminders, class-start notifications — rule-based tasks are automated so the admissions team focuses on real counselling.",
      },
      {
        heading: "Dữ liệu học viên đi cùng hành trình",
        headingEn: "Student data follows the journey",
        body: "Từ lead đến học viên chính thức, hồ sơ không được nhập lại mà chuyển trạng thái — kết nối tuyển sinh với quản lý lớp học và kết quả đào tạo.",
        bodyEn:
          "From lead to enrolled student, the profile is not re-entered but transitions state — connecting admissions with class management and training outcomes.",
      },
    ],
  },
  {
    slug: "api-tich-hop-he-thong-logistics",
    headerConfig: "Logistics",
    headerConfigEn: "Logistics",
    title: "Tích hợp API: đồng bộ đơn hàng qua nhiều đơn vị vận chuyển",
    titleEn: "API integration: syncing orders across multiple carriers",
    excerpt:
      "Khi hệ thống quản lý kết nối trực tiếp với các đơn vị giao nhận, trạng thái đơn hàng tự cập nhật — nhân sự ngừng kiểm tra tay từng vận đơn.",
    excerptEn:
      "When the management system connects directly to carriers, order status updates itself — staff stop checking each shipment by hand.",
    image: "/images/industries/logistics.jpg",
    publishedAt: "2025-05-08",
    sections: [
      {
        heading: "Một luồng dữ liệu thống nhất",
        headingEn: "One unified data flow",
        body: "Từ tạo đơn đến giao hàng, mỗi trạng thái được truyền tự động giữa hệ thống doanh nghiệp và đơn vị vận chuyển. Toàn bộ hành trình đơn hàng nhìn thấy ở một nơi.",
        bodyEn:
          "From order creation to delivery, every status propagates automatically between the business system and carriers. The whole shipment journey is visible in one place.",
      },
      {
        heading: "Kết nối nhiều đối tác qua một nền tảng",
        headingEn: "Many partners through one platform",
        body: "Mỗi đơn vị giao nhận có cách kết nối riêng. Một lớp tích hợp chung chuẩn hóa khác biệt đó — doanh nghiệp thêm đối tác mới mà không phải viết lại hệ thống.",
        bodyEn:
          "Each carrier connects differently. A common integration layer normalises those differences — the business adds new partners without rewriting the system.",
      },
      {
        heading: "Mở rộng theo quy mô",
        headingEn: "Scale with volume",
        body: "Khi số lượng đơn tăng, chi phí vận hành không tăng theo — vì nhập liệu, đối soát và cập nhật trạng thái đã là việc của hệ thống, không còn của con người.",
        bodyEn:
          "As order volume grows, operating cost does not grow with it — because entry, reconciliation and status updates belong to the system, not to people.",
      },
    ],
  },
  {
    slug: "su-kien-y-khoa-so-hoa-check-in",
    headerConfig: "Y tế",
    headerConfigEn: "Healthcare",
    title: "Hội nghị y khoa: khi check-in ngàn người chỉ còn một thao tác",
    titleEn: "Medical conferences: when checking in a thousand people is one action",
    excerpt:
      "Ứng dụng quản lý sự kiện số hóa toàn bộ chương trình, diễn giả, tài liệu và check-in — giảm thời gian xử lý từ hàng giờ xuống vài phút.",
    excerptEn:
      "An event management app digitises the whole program — speakers, documents, check-in — cutting processing time from hours to minutes.",
    image: "/images/industries/healthcare.jpg",
    publishedAt: "2025-04-15",
    sections: [
      {
        heading: "Bài toán của sự kiện chuyên môn",
        headingEn: "The professional-event problem",
        body: "Hội thảo khoa học có nhiều phòng, nhiều phiên và danh sách diễn giả thay đổi liên tục. Quản lý bằng giấy tờ và Excel khiến check-in chậm và thông tin luôn trễ một nhịp.",
        bodyEn:
          "Scientific conferences have multiple rooms, sessions and constantly changing speaker lists. Managing on paper and Excel makes check-in slow and keeps information one step behind.",
      },
      {
        heading: "Ứng dụng sự kiện như trung tâm điều hành",
        headingEn: "The event app as a control centre",
        body: "Trong dự án cho Bệnh viện Bình Dân, app sự kiện quản lý chương trình, lịch trình, diễn giả, tài liệu và check-in trên một nền tảng — cập nhật phát sóng đến người tham dự tức thì.",
        bodyEn:
          "In the Binh Dan Hospital project, the event app manages program, schedule, speakers, documents and check-in on one platform — updates broadcast to attendees instantly.",
      },
      {
        heading: "Dữ liệu sau sự kiện",
        headingEn: "Data after the event",
        body: "Điểm danh, tương tác và phản hồi được lưu trữ có cấu trúc — ban tổ chức có báo cáo thật thay vì chồng phiếu giấy.",
        bodyEn:
          "Attendance, interaction and feedback are stored in structured form — organisers get real reports instead of a stack of paper slips.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): MockPost | null {
  return mockPosts.find((post) => post.slug === slug) ?? null;
}

export function getRelatedPosts(slug: string, count = 3): MockPost[] {
  return mockPosts.filter((post) => post.slug !== slug).slice(0, count);
}
