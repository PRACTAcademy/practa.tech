import sanityClient from '@sanity/client';

const client = sanityClient({
    projectId: 'f77le0x7',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
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

export default client;
