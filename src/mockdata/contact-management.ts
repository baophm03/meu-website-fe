"use client";

export const NEWSLETTER_SUBSCRIPTIONS_STORAGE_KEY =
  "vcci-news.admin-contact-management.newsletter-subscriptions.v1";
export const CONTACT_REQUESTS_STORAGE_KEY =
  "vcci-news.admin-contact-management.contact-requests.v1";

export const CONTACT_PURPOSE_OPTIONS = [
  "Hội viên VCCI",
  "Xuất xứ hàng hóa C/O",
  "Xúc tiến thương mại",
  "Quảng cáo",
  "Mục đích khác",
] as const;

export type ContactPurpose = (typeof CONTACT_PURPOSE_OPTIONS)[number];

export interface NewsletterSubscriptionItem {
  id: string;
  email: string;
  submittedAt: string;
}

export interface ContactRequestItem {
  id: string;
  purpose: ContactPurpose;
  contactName: string;
  contactPosition: string;
  contactEmail: string;
  contactPhone: string;
  message: string;
  organizationName: string;
  businessField: string;
  email: string;
  website: string;
  submittedAt: string;
}


const NEWSLETTER_SUBSCRIPTION_SEED: NewsletterSubscriptionItem[] = [
  {
    id: "newsletter-001",
    email: "banthuongtruc@saigreen.vn",
    submittedAt: "2026-05-10T08:15:00+07:00",
  },
  {
    id: "newsletter-002",
    email: "marketing@thienphuoclogistics.vn",
    submittedAt: "2026-05-10T14:45:00+07:00",
  },
  {
    id: "newsletter-003",
    email: "ceo@mekongfoods.com.vn",
    submittedAt: "2026-05-11T09:22:00+07:00",
  },
  {
    id: "newsletter-004",
    email: "office@vinalinktech.vn",
    submittedAt: "2026-05-11T16:05:00+07:00",
  },
];

const CONTACT_REQUEST_SEED: ContactRequestItem[] = [
  {
    id: "contact-001",
    purpose: "Hội viên VCCI",
    contactName: "Nguyễn Thị Hồng Nhung",
    contactPosition: "Trưởng phòng đối ngoại",
    contactEmail: "nhung.nguyen@daianholdings.vn",
    contactPhone: "0903456781",
    message:
      "Chúng tôi cần được tư vấn về điều kiện tham gia mạng lưới hội viên và quy trình cập nhật hồ sơ doanh nghiệp trên cổng thông tin.",
    organizationName: "Công ty Cổ phần Đại An Holdings",
    businessField: "Đầu tư thương mại và dịch vụ",
    email: "contact@daianholdings.vn",
    website: "https://daianholdings.vn",
    submittedAt: "2026-05-10T10:18:00+07:00",
  },
  {
    id: "contact-002",
    purpose: "Xuất xứ hàng hóa C/O",
    contactName: "Trần Quốc Bảo",
    contactPosition: "Chuyên viên xuất nhập khẩu",
    contactEmail: "bao.tran@saigonexport.vn",
    contactPhone: "0911223344",
    message:
      "Doanh nghiệp cần hướng dẫn hồ sơ xin cấp C/O cho lô hàng xuất khẩu sang thị trường EU trong tháng này.",
    organizationName: "Công ty TNHH Saigon Export Hub",
    businessField: "Xuất nhập khẩu hàng tiêu dùng",
    email: "info@saigonexport.vn",
    website: "https://saigonexport.vn",
    submittedAt: "2026-05-10T15:42:00+07:00",
  },
  {
    id: "contact-003",
    purpose: "Xúc tiến thương mại",
    contactName: "Phạm Minh Quân",
    contactPosition: "Giám đốc kinh doanh",
    contactEmail: "quan.pham@newhorizon.vn",
    contactPhone: "0988112233",
    message:
      "Đề nghị kết nối doanh nghiệp với các chương trình xúc tiến thương mại tại Nhật Bản và Hàn Quốc trong quý III.",
    organizationName: "New Horizon Manufacturing",
    businessField: "Sản xuất công nghiệp hỗ trợ",
    email: "sales@newhorizon.vn",
    website: "https://newhorizon.vn",
    submittedAt: "2026-05-11T08:35:00+07:00",
  },
  {
    id: "contact-004",
    purpose: "Quảng cáo",
    contactName: "Lê Diễm My",
    contactPosition: "Marketing Manager",
    contactEmail: "my.le@bluepeakmedia.vn",
    contactPhone: "0933778899",
    message:
      "Chúng tôi muốn tìm hiểu gói quảng cáo banner và bài PR trên chuyên trang MeU Solutions trong tháng 6.",
    organizationName: "Blue Peak Media",
    businessField: "Truyền thông và quảng cáo",
    email: "hello@bluepeakmedia.vn",
    website: "https://bluepeakmedia.vn",
    submittedAt: "2026-05-11T11:10:00+07:00",
  },
  {
    id: "contact-005",
    purpose: "Mục đích khác",
    contactName: "Đỗ Thanh Bình",
    contactPosition: "Phó tổng giám đốc",
    contactEmail: "binh.do@greenriver.org.vn",
    contactPhone: "0977554433",
    message:
      "Mong muốn làm việc với ban biên tập để chia sẻ thông tin về chương trình đào tạo ESG dành cho doanh nghiệp hội viên.",
    organizationName: "Green River Advisory",
    businessField: "Tư vấn phát triển bền vững",
    email: "office@greenriver.org.vn",
    website: "https://greenriver.org.vn",
    submittedAt: "2026-05-11T13:50:00+07:00",
  },
];


function readStorage<T>(storageKey: string, seed: T[]): T[] {
  if (typeof window === "undefined") return seed;

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return seed;

  try {
    const parsed = JSON.parse(raw) as T[];
    return Array.isArray(parsed) ? parsed : seed;
  } catch {
    return seed;
  }
}

function persistStorage<T>(storageKey: string, items: T[]): void {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(storageKey, JSON.stringify(items));
}

export function readNewsletterSubscriptions(): NewsletterSubscriptionItem[] {
  return readStorage(NEWSLETTER_SUBSCRIPTIONS_STORAGE_KEY, NEWSLETTER_SUBSCRIPTION_SEED);
}

export function persistNewsletterSubscriptions(items: NewsletterSubscriptionItem[]): void {
  persistStorage(NEWSLETTER_SUBSCRIPTIONS_STORAGE_KEY, items);
}

export function readContactRequests(): ContactRequestItem[] {
  return readStorage(CONTACT_REQUESTS_STORAGE_KEY, CONTACT_REQUEST_SEED);
}

export function persistContactRequests(items: ContactRequestItem[]): void {
  persistStorage(CONTACT_REQUESTS_STORAGE_KEY, items);
}


