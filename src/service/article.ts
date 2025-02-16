import { get, post } from "./apiService";

export interface Category {
  id: string;
  categoryName: string;
  fatherCategoryName: string;
  deleted: number;
  createdTime: string;
  updatedTime: string;
}

export interface BlogRecord {
  id: string;
  title: string;
  description: string;
  category?: Category | null;
  categoryId: string;
  fatherCategoryId: string;
  coverImage: string;
  content: string | null;
  pageView: number;
  preferNum: number;
  status: number;
  privacy: number;
  authorId: string;
  top: number;
  deleted: number;
  publishedTime: string;
  updatedTime: string | null;
}

export interface BlogListResponseData {
  records: BlogRecord[];
  total: number;
  size: number;
  current: number;
  pages: number;
}
export interface BlogListSearchParams {
    page?: number;
    size?: number;
    title?: string;
    keywords?: string;
    category?: string;
    sortBy?: string;
    status?: string;
    publishedStart?: string;
    publishedEnd?: string;
}

export async function articleListData(data: BlogListSearchParams) {
  return await post<BlogListResponseData, BlogListSearchParams>("/blog/list", data);
}

export async function articleDetailData(id: string) {
  return await get<BlogRecord>(`/blog/${id}`);
}
export async function postArticle(data: any) {
  return await post<BlogRecord, BlogListSearchParams>("/blog", data);
}