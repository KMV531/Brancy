import React from "react";

const BlogSection = () => {
  return (
    <main className="bg-white">
      <section className="max-w-6xl mx-auto pb-20 lg:py-20 px-5 lg:px-0">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl md:text-4xl lg:text-6xl text-gray-700">
            New Posts
          </h1>
          <p className="max-w-[500px] text-center text-gray-500 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis
          </p>
        </div>
      </section>
    </main>
  );
};

export default BlogSection;
