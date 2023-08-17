interface ProjectList {
  page: string;
  size: string;
}

interface Project {
  title: string;
  description: string;
  link: string;
}

export type { ProjectList, Project };
