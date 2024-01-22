import React, { useState, useEffect } from "react";
import { Pagination } from "../../components/pagination/Pagination";
import { getArticles } from "../../hooks/article/GetAll";
import { useNavigate } from "react-router-dom";

const GetAllArticle = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  const handleReadMore = (articleId) => {
    navigate(`/article/details/${articleId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getArticles(currentPage, 5);
        setArticles(response.data);
        setTotalPages(response.pagination.total_pages);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="mb-4 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <h2 className="text-2xl font-bold mb-4">Artikel Terbaru</h2>
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex flex-col sm:flex-row sm:justify-start mb-8 bg-white rounded-lg shadow-lg p-4 lg:p-8"
          >
            <div className="mb-4 sm:mr-4 sm:mb-0">
              {article.photo && (
                <img
                  src={article.photo}
                  alt={`Gambar Artikel ${article.title}`}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {article.title}
              </h2>
              <p className="text-gray-600">{article.content}</p>
              <button
                className="text-black underline font-bold mt-4"
                onClick={() => handleReadMore(article.id)}
              >
                Baca selengkapnya
              </button>
            </div>
          </div>
        ))}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default GetAllArticle;
