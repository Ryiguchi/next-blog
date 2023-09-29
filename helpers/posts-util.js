import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, '');

  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  // "data" contains the metadata as object "content" contains the markdown as string
  const { data, content } = matter(fileContent);

  const postData = {
    ...data,
    slug: postSlug,
    content,
  };
  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map(postFile => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter(post => post.isFeatured);

  return featuredPosts;
}