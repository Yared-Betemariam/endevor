import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { FaPlus } from "react-icons/fa";

const MyPosts = () => {
  const { data: postData } = useQuery("fetchMyHotels", apiClient.fetchMyPosts, {
    onError: (error) => {
      console.log(error);
    },
  });

  if (!postData) {
    return <p>No Posts Found</p>;
  }
  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-3xl font-jost font-semibold">My Posts</h2>
        <Link
          to="/add-post"
          className="bg-red-800 bg-opacity-75 rounded-full px-6 py-3 flex gap-2 items-center"
        >
          <FaPlus className="text-sm" />
          Add Post
        </Link>
      </div>
      <div>
        {postData.map((item) => (
          <Link
            to={item._id}
            key={item.name}
            className="my-4 flex flex-col gap-2"
          >
            <div className="flex flex-col gap-2 md:flex-row">
              <img
                src={item.imageUrls[0]}
                alt=""
                className="object-cover object-center w-full md:max-w-[40%] max-h-[30vh] h-full rounded-3xl"
              />
              <div className="flex flex-col px-4 gap-2">
                <div className="flex gap-3">
                  <p className="  text-3xl font-bold font-jost">{item.name}</p>
                  <span className="bg-red-800 rounded-full px-3 py-1 my-auto mr-auto text-sm opacity-70">
                    {item.type}
                  </span>
                </div>
                <p className=" ">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
