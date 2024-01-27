import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useArticleDetail from "../../hooks/article/DetailsArticle";
import Loading from "../../components/modals/Loading";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

const DetailArticle = () => {
  const { id } = useParams();
  const { articleDetail, loading, error } = useArticleDetail(id);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 p-4">
      <div className="mb-4 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {articleDetail.title}
        </h2>
        <div className="mx-auto mb-4 sm:mr-4 sm:mb-0">
          <img
            src={articleDetail.photo}
            alt="Gambar Artikel"
            className="w-full max-w-xs h-auto rounded-lg shadow-lg mx-auto"
          />
        </div>
        <p className="text-gray-600 mt-4 whitespace-pre-line">
          {articleDetail.content}
        </p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm">Oleh: {articleDetail.author}</p>
          <p className="text-sm">
            Tanggal: {formatDate(articleDetail.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailArticle;
