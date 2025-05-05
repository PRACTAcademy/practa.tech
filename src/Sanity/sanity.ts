import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'f77le0x7',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

export async function getMainEvent() {
    try {
        return await client.fetch(`*[_type == "mainEvent"][0]{
      _id,
      name,
      date,
      description,
      image,
      link
    }`);
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching main event");
    }
}

export async function getBlogPosts() {
    try {
        return await client.fetch(`*[_type == "blogPost"]{
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      coverImage,
      body
    }`);
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching blog posts");
    }
}

export async function getProjects() {
    try {
        return await client.fetch(`*[_type == "project"]{
      _id,
      title,
      description,
      thumbnail,
      technologies,
      link
    }`);
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching projects");
    }
}

// Added function to fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string) {
    try {
        return await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      coverImage,
      body
    }`, { slug });
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching blog post by slug");
    }
}

// Added function to fetch a single project by ID
export async function getProjectById(id: string) {
    try {
        return await client.fetch(`*[_type == "project" && _id == $id][0]{
      _id,
      title,
      description,
      thumbnail,
      technologies,
      link
    }`, { id });
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching project by ID");
    }
}
