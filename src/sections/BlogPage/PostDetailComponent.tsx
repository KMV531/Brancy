"use client";

import { urlFor } from "@/sanity/lib/image";
import { BlogPost } from "@/types/blogTypes";
import { PortableText, PortableTextReactComponents } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaPinterest, FaTwitter } from "react-icons/fa";
import BlogDetailAdvertisementSection from "./BlogDetailAdvertisement";
import CommentSection from "@/components/(Blogcomments)/CommentSection";

const categoryBgClass = (categoryName: string) => {
  switch (categoryName?.toLowerCase()) {
    case "beauty":
      return "bg-orange-400";
    case "fashion":
      return "bg-purple-600";
    default:
      return "bg-gray-400";
  }
};

type GalleryImage = {
  _key: string;
  _type: string;
  alt?: string;
  asset: {
    _ref: string;
    _type: string;
  };
};

const PostDetailComponent = ({ post }: { post: BlogPost }) => {
  const placeholderImage = "/assets/images/placeholder-image.jpg";
  const authorImage = post.author?.image
    ? urlFor(post.author.image).url()
    : placeholderImage;

  const customComponents: PortableTextReactComponents = {
    types: {
      image: ({ value }) =>
        value?.asset?._ref ? (
          <div className="my-8 overflow-hidden rounded-xl shadow-lg">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || "Blog image"}
              width={1200}
              height={630}
              className="w-full h-auto object-cover transition-all duration-500 hover:scale-105"
            />
            {value.alt && (
              <p className="mt-2 text-center text-sm text-gray-500 italic">
                {value.alt}
              </p>
            )}
          </div>
        ) : null,

      imageGalleryBlock: function ImageGalleryBlock({ value }) {
        const [activeImageIndex, setActiveImageIndex] = React.useState(0);

        if (!value?.images?.length) return null;
        const mainImage = value.images[activeImageIndex];

        return (
          <div className="my-12 space-y-4">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <Image
                src={urlFor(mainImage).width(1200).height(800).url()}
                alt={mainImage.alt || "Gallery image"}
                width={1200}
                height={800}
                className="w-full h-auto object-cover transition-all duration-300"
              />
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {(value.images as GalleryImage[]).map((img, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                    idx === activeImageIndex
                      ? "ring-4 ring-[#068D53]"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Afficher l'image ${idx + 1}`}
                >
                  <Image
                    src={urlFor(img).width(200).height(200).url()}
                    alt={img.alt || "Miniature"}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        );
      },
    },
    block: {
      h1: ({ children }) => (
        <h1 className="text-4xl md:text-5xl font-bold mb-8 mt-12 text-gray-900 leading-tight title">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-10 text-gray-800 border-l-4 border-[#068D53] pl-4 sub-title">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl md:text-3xl font-semibold mb-5 mt-8 text-gray-700 sub-title">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-xl md:text-2xl font-medium mb-4 mt-6 text-gray-600 sub-title">
          {children}
        </h4>
      ),
      p: ({ children }) => (
        <p className="text-lg text-gray-700 mb-6 leading-relaxed sub-title">
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-[#1E2D7D] pl-6 my-6 italic text-gray-600 bg-gray-50 p-4 rounded-r-lg sub-title">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="space-y-3 my-6 pl-6 list-disc sub-title py-1">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="space-y-3 my-6 pl-6 list-decimal sub-title py-1">
          {children}
        </ol>
      ),
    },
    listItem: ({ children }) => (
      <li className="text-lg text-gray-700 mb-2 sub-title py-1">{children}</li>
    ),
    marks: {
      link: ({ children, value }) => {
        const raw = value?.href || "";
        let href = "#";

        const isWhatsApp = raw.startsWith("wa.me") || raw.includes("whatsapp");
        const isPhone = /^\+?\d{7,15}$/.test(raw);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw);
        const isUrl = /^https?:\/\//.test(raw);

        if (isWhatsApp) {
          const numberOnly = raw.replace(/\D/g, ""); // extract numbers
          href = `https://wa.me/${numberOnly}`;
        } else if (isPhone) {
          href = `tel:${raw}`;
        } else if (isEmail) {
          href = `mailto:${raw}`;
        } else if (isUrl) {
          href = raw;
        }

        return (
          <a
            href={href}
            className="text-[#1E2D7D] font-medium sub-title hover:text-[#068D53] underline underline-offset-4 transition-colors py-2"
            target={isUrl ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },
      strong: ({ children }) => (
        <strong className="font-semibold text-gray-800 sub-title py-1">
          {children}
        </strong>
      ),
      em: ({ children }) => <em className="italic sub-title">{children}</em>,
      code: ({ children }) => (
        <code className="font-mono bg-gray-100 px-2 py-1 rounded text-sm sub-title">
          {children}
        </code>
      ),
    },
    hardBreak: () => <br />,

    // Adding the required unknown properties with styles
    unknownMark: ({ children }) => (
      <span className="text-[#1E2D7D] italic sub-title py-2">{children}</span> // For unrecognized marks
    ),
    unknownType: ({ children }) => (
      <div className="border-2 border-dashed p-2 text-center text-gray-500 sub-title py-2">
        {children}
      </div> // For unknown types
    ),
    unknownBlockStyle: ({ children }) => (
      <div className="my-4 p-4 bg-gray-200 sub-title py-2">{children}</div> // For unknown block styles
    ),
    unknownList: ({ children }) => (
      <ul className="list-inside pl-4 text-gray-600 sub-title py-2">
        {children}
      </ul> // For unknown list types
    ),
    unknownListItem: ({ children }) => (
      <li className="list-item text-gray-600 sub-title py-2">{children}</li> // For unknown list items
    ),
  };

  return (
    <main className="max-w-6xl mx-auto mb-20 px-5 lg:px-0">
      <section className="flex flex-col space-y-8 items-start justify-start">
        <h1 className="text-2xl md:text-4xl lg:text-6xl text-gray-700 font-medium">
          {post?.title}
        </h1>
        <div>
          {post.category?.title && (
            <span
              className={`inline-block px-4 py-2 text-white text-sm font-semibold rounded-full ${categoryBgClass(
                post.category.title
              )}`}
            >
              {post.category.title}
            </span>
          )}
        </div>
        <div>
          {post.coverImage && (
            <div className="rounded-xl overflow-hidden">
              <Image
                src={urlFor(post.coverImage).url()}
                alt={post.title}
                width={800}
                height={600}
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
        <div className="flex lg:flex-row items-start lg:items-center justify-between flex-col gap-4 mt-8">
          <div className="flex lg:flex-row items-start lg:items-center justify-between flex-col gap-4">
            <div className="flex-shrink-0 flex items-center justify-center gap-4">
              <Image
                src={authorImage}
                alt={post.author.name}
                width={48}
                height={48}
                className="rounded-full object-cover border-4 border-gray-500 shadow-sm"
              />
              <p className="font-medium text-gray-900">{post.author.name}</p>
            </div>
            <div>
              {new Date(post._createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="ml-10 flex items-center justify-center">
            <p className="text-gray-500 text-lg mr-10">Share:</p>
            <div className="flex space-x-6">
              <Link
                href="/"
                aria-label="Twitter"
                className="hover:text-blue-500"
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                href="/"
                aria-label="Facebook"
                className="hover:text-blue-700"
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                href="/"
                aria-label="Pinterest"
                className="hover:text-red-500"
              >
                <FaPinterest size={20} />
              </Link>
            </div>
          </div>
        </div>
        {post.content && (
          <PortableText value={post.content} components={customComponents} />
        )}
      </section>
      <BlogDetailAdvertisementSection />
      <div className="border border-gray-400 w-full my-16 mx-auto" />

      <div className="mt-16">
        <CommentSection blogId={post._id} comments={post.comments || []} />
      </div>
    </main>
  );
};

export default PostDetailComponent;
