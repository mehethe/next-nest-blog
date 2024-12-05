import FilterOptions from './filter-options';

type Blog = {
  id: string;
  title: string;
  content: string;
  cover: string;
  status: FilterOptions;
  createdAt: Date;
  authorId: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
};

export default Blog;
