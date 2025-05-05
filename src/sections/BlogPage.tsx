'use client';

import { useEffect, useState } from 'react';
import { getBlogPosts } from '@/Sanity/sanity';
import { motion } from "framer-motion";
import { gsap } from "gsap";

// Define a better type for body based on your actual schema.
// If the body is portable text (Sanity), you can use `unknown` or a more specific type.
type BlogPost = {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt: string;
    coverImage: string;
    body: unknown; // Changed from `any` to `unknown`
};

export default function BlogFeed() {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        getBlogPosts()
            .then(setPosts)
            .catch(console.error);

        gsap.to(".parallax", {
            y: -50,
            scrollTrigger: {
                trigger: ".parallax",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });
    }, []);

    return (
        <motion.section
            className="text-white px-10 py-6 min-h-screen mt-15 z-20 parallax"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-6 z-20">
                <h1 className="text-5xl font-bold">Blog Feed</h1>
                <a href="#" className="text-sm text-gray-300 hover:underline flex items-center">
                    See More <span className="ml-1">→</span>
                </a>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 z-20"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 1 }}
            >
                {posts.map((post) => (
                    <div
                        key={post._id}
                        className="bg-[#111] border border-gray-800 hover:border-white rounded-lg overflow-hidden transition-all duration-300"
                    >
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-60 object-cover"
                        />

                        <div className="p-4 flex flex-col justify-between min-h-[180px]">
                            <div className="flex justify-end mb-2">
                                <div className="w-10 h-6 bg-blue-600 rounded" />
                            </div>

                            <div className="flex-1 bg-red-600 p-3 text-sm text-white font-medium rounded">
                                <p className="line-clamp-4">{post.excerpt}</p>
                            </div>

                            <p className="mt-2 text-xs text-gray-400">
                                {new Date(post.publishedAt).toLocaleDateString()}
                            </p>
                            <a
                                href={`/blog/${post.slug.current}`}
                                className="mt-1 text-xs text-blue-400 underline"
                            >
                                View Post
                            </a>
                        </div>
                    </div>
                ))}
            </motion.div>
        </motion.section>
    );
}
