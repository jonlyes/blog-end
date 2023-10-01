interface MomentListParams {
  timestamp: string;
  size?: number;
}

interface MomentListItem {
  id: number;
  content: string;
  pictures: string[];
  createAt: string;
  updateAt: string;
}

export type { MomentListParams,MomentListItem };
