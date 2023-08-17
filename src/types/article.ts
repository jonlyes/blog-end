interface ArticleList {
  page: string;
  size: string;
}

interface ArticleId {
  articleId: string;
}

// 可见类型
type visibleType = "public" | "private";

interface Article {
  title: string;
  content: string;
  type: visibleType;
  imgList: string[];
}

export type { ArticleList, ArticleId, visibleType, Article };
