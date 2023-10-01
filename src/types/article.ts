interface ArticleListParams {
  page: string;
  size: string;
}

interface ArticleId {
  articleId: string;
}

// 可见类型
type visibleType = "public" | "private";

interface CreateArticle {
  title: string;
  content: string;
  type: visibleType;
  imgList: string[];
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

export type {
  ArticleListParams,
  CreateArticle,
  ArticleId,
  visibleType,
  ArticleListItem,
  ArticleDetail
};
