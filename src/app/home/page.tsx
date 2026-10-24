import CreatePost from "@/src/components/CreatePost";
import Post from "@/src/components/Post";

export default function Page() {
  return (
    <div>
      <div className="border border-border h-14 grid grid-cols-2 text-white">
        <button className="cursor-pointer font-semibold hover:bg-hover">
          For You
        </button>
        <button className="cursor-pointer font-semibold hover:bg-hover">
          Following
        </button>
      </div>
      <CreatePost />
      <Post />
    </div>
  );
}
