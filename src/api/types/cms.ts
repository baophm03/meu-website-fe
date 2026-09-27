export interface CmsTagItem {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

export interface CmsHeaderConfigItem {
  id: string;
  name: string;
  name_en?: string | null;
  type?: string;
  url?: string | null;
  sort_order?: number | null;
  parent_id?: string | null;
  description?: string | null;
  description_en?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CmsFileItem {
  id: string;
  path?: string;
  original?: string;
  mime?: string;
}

export interface CmsPostContentImage {
  position: number;
  caption: string;
  image: {
    id: string;
    name: string;
    alt: string;
    url: string;
  };
}

export interface CmsPostContentSection {
  id: string;
  type: "text" | "image";
  position: number;
  content: string;
  image_columns: number;
  image_rows: number;
  images: CmsPostContentImage[];
}

export interface CmsUserSummary {
  id: string;
  email: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string;
  avatar_url: string | null;
}

export interface CmsNewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  tagsearch_values: string[];
  tag_ids: string[];
  page_config_ids: string[];
  page_configs: CmsPageConfigSummary[];
  is_featured: boolean;
  thumbnail: {
    id: string;
    name: string;
    alt: string;
    url: string;
  } | null;
  is_hidden: boolean;
  created_at: string;
  updated_at: string;
  published_at: string;
  expired_at: string;
  post_content: CmsPostContentSection[];
  creator: CmsUserSummary | null;
  editor: CmsUserSummary | null;
}

export interface CmsHeaderConfigDetailItem {
  id: string;
  code: string;
  name: string;
  name_en?: string | null;
  static_link: string;
  sort_order: number;
  parent_id: string | null;
  api_parent_id: string | null;
  level: number;
  description?: string;
  description_en?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CmsPagedResult<T> {
  count: number;
  page?: number;
  pageSize?: number;
  rows: T[];
}


export interface CmsHeaderConfigNode extends CmsHeaderConfigItem {
  children?: CmsHeaderConfigNode[];
}

export interface CmsRawPostItem {
  id?: string;
  title?: string;
  content?: string | null;
  release_at?: string | null;
  is_active?: boolean | null;
  release_mode?: string | null;
  slug?: string | null;
  summary?: string | null;
  page_configs?: CmsPageConfigSummary[] | null;
  created_by?: string | null;
  updated_by?: string | null;
  status?: string | null;
  type?: string | null;
  thumbnail?: CmsFileItem | null;
  is_featured?: boolean | null;
  is_hidden?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
  published_at?: string | null;
  expired_at?: string | null;
  started_at?: string | null;
  ended_at?: string | null;
  registration_deadline?: string | null;
  location?: string | null;
  participation_fee?: string | null;
  event_dates?: string[] | null;
  content_structure?: Record<string, unknown> | null;
  creator?: CmsRawUser | null;
  editor?: CmsRawUser | null;
}

export interface CmsRawUser {
  id?: string | null;
  email?: string | null;
  username?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
}

export interface CmsPivotItem {
  post_id?: string;
  headerConfig_id?: string;
  tag_id?: string;
  created_at?: string;
}

export interface CmsPageConfigSummary {
  id?: string;
  name?: string;
  name_en?: string | null;
  path?: string;
  is_active?: boolean | null;
}

export interface CmsNewsPayloadInput {
  title: string;
  slug: string;
  summary: string;
  tag_ids: string[];
  page_config_id?: string | null;
  page_config_ids?: string[];
  is_featured: boolean;
  thumbnail_id?: string | null;
  is_hidden: boolean;
  published_at?: string | null;
  expired_at?: string | null;
  post_content: CmsPostContentSection[];
}
