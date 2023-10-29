interface ProjectList {
  page: string;
  size: string;
}

interface Project {
  title: string;
  description: string;
  link: string;
}
interface ProjectListItem {
  id: number;
  link: string;
  title: string;
  description: string;
  cover: string;
  createAt: string;
  updateAt: string;
}

export type { ProjectList, Project,ProjectListItem };
