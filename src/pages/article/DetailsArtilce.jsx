import React, { useEffect, useState } from "react";
import getArticleDetails from "../../hooks/article/DetailsArticle";

const DetailArticle = () => {
  const [articleDetails, setArticleDetails] = useState(null);
  const articleId = 5; // Ganti dengan ID artikel yang diinginkan

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const details = await getArticleDetails(articleId);
        setArticleDetails(details.data);
      } catch (error) {
        console.error("Error fetching article details:", error);
      }
    };

    fetchArticleDetails();
  }, [articleId]);

  if (!articleDetails) {
    // Tampilkan indikator loading atau pesan error jika data masih dimuat atau terjadi kesalahan
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-100 p-8">
      <div className="bg-white p-8 shadow-md rounded-lg ">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {articleDetails.title}
        </h2>
        <div className="mx-auto mb-4 sm:mr-4 sm:mb-0">
          <img
            src={articleDetails.photo}
            alt="Gambar Artikel"
            className="w-full max-w-xs h-auto rounded-lg shadow-lg mx-auto"
          />
        </div>
        <p className="text-gray-600 mt-4">{articleDetails.content}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm">Created by: {articleDetails.author}</p>
          <p className="text-sm">Date: {articleDetails.created_at}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailArticle;
