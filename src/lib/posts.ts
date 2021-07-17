import { join } from 'path';
import fs from 'fs';
import { PostData } from '../types';
import matter from 'gray-matter';

const postDirPath = join(process.cwd(), 'src/content/blog');

export const getPostBySlug = (slug: string) => {
  const slugPath = join(postDirPath, slug, 'index.md');
  const fileContents = fs.readFileSync(slugPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { slug: slug, title: data.title, date: data.date, content: content };
};

export const getAllPosts = () => {
  const slugs = fs.readdirSync(postDirPath);

  const allPosts: PostData[] = slugs.map((slug) => getPostBySlug(slug));
  const posts = allPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return posts;
};
