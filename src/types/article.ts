// 可见类型
type visibleType = "public" | "private";

interface ArticleListParams {
  page: string;
  size: string;
}


interface ArticleId {
  articleId: string;
}

interface ArticleListItem {
  id: number;
  title: string;
  cover: string;
  type: visibleType;
  createAt: string;
  updateAt: string;
}

interface ArticleDetail {
  id: number;
  title: string;
  cover: string;
  content: string;
  type: visibleType;
  imgList: string[];
  createAt: string;
  updateAt: string;
}

interface CreateArticle {
  title: string;
  content: string;
  type: visibleType;
  cover: string;
}
interface UpdateArticle {
  title: string;
  content: string;
  type: visibleType;
  cover:string
}

export type {
  ArticleListParams,
  ArticleId,
  ArticleListItem,
  ArticleDetail,
  CreateArticle,
  UpdateArticle,
  visibleType,
};
