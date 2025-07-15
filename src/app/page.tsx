"use client";
import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "@/firebaseConfig";
import fomatMessage from "@/helper/fomatMessage";
import SearchPopup from "@/components/SearchPopup";
import { toast } from "react-toastify";

interface Post {
  message: string;
  imageUrl: string;
  createdAt: number;
  emoji?: string;
}

export default function DiaryViewer() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await get(ref(database, "posts"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const postArray = Object.values(data) as Post[];
        postArray.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(postArray);
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = (date: string, emoji: string) => {
    const filtered = posts.filter((post) => {
      const dateMatch = date
        ? new Date(post.createdAt).toISOString().slice(0, 10) === date
        : true;
      const emojiMatch = emoji ? post.emoji === emoji : true;
      return dateMatch && emojiMatch;
    });

    if (filtered.length > 0) {
      setFilteredPosts(filtered);
      setCurrentIndex(0);
      setIsFiltering(true);
      setShowPopup(false);
    } else {
      toast.warning("Không tìm thấy bài viết phù hợp !!", {
        position: "top-right",
        autoClose: 3000, // Tự đóng sau 3s
        hideProgressBar: false, // Hiện progress bar
        closeOnClick: true, // Bấm đóng
        pauseOnHover: true, // Dừng khi hover
        draggable: true, // Kéo thả
        progress: undefined,
        theme: "colored", // Hoặc "light", "dark"
      });
      // alert("Không tìm thấy bài viết phù hợp.");
    }
  };

  const handleClearFilter = () => {
    setIsFiltering(false);
    setFilteredPosts([]);
    setCurrentIndex(0);
  };

  const next = () => {
    if (currentIndex < currentList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentList = isFiltering ? filteredPosts : posts;
  const currentPost = currentList[currentIndex];

  return (
    <div className="h-screen flex items-center justify-center px-[20px]">
      <div className="flex flex-col gap-4 max-w-md mx-auto rounded-2xl bg-white px-[20px] py-[20px] w-full shadow-xl">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[var(--color-main)]">
            Diary of 🍉
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPopup(true)}
              className="text-sm text-[var(--color-main)]"
            >
              🔍
            </button>
            {isFiltering && (
              <button
                onClick={handleClearFilter}
                className="text-sm text-red-500 "
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {currentPost ? (
          <>
            <div className="text-gray-700 border border-gray-300 rounded-xl p-4">
              <p className="text-sm text-gray-400 mt-2">
                {new Date(currentPost.createdAt).toLocaleString("vi-VN")}
              </p>
              {currentPost.imageUrl && (
                <img
                  src={currentPost.imageUrl}
                  alt="Post"
                  className="w-full rounded-xl h-[150px] object-cover"
                />
              )}
              <div className="mb-4 h-[250px] mt-[10px] overflow-y-auto">
                {fomatMessage(currentPost.message)}
              </div>
              {currentPost.emoji && (
                <p className="text-2xl">
                  <span className="text-[15px] font-bold text-[var(--color-main)]">
                    Hôm nay tôi thấy
                  </span>{" "}
                  {currentPost.emoji}
                </p>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={prev}
                disabled={currentIndex === 0}
                className="px-4 py-2 bg-[var(--color-main)] text-[white] rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm text-gray-600">
                {currentIndex + 1}/{currentList.length}
              </span>
              <button
                onClick={next}
                disabled={currentIndex === currentList.length - 1}
                className="px-4 py-2 bg-[var(--color-main)] text-[white] rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Không có nhật ký nào.</p>
        )}
      </div>

      {showPopup && (
        <SearchPopup
          onClose={() => setShowPopup(false)}
          onSearch={handleSearch}
        />
      )}
    </div>
  );
}
