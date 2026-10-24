import Image from 'next/image'
import { IoSearchOutline } from 'react-icons/io5'

export default function RightSidebar() {
  return (
    <aside className="hidden xl:block w-87.5 sticky top-0 h-screen px-8 py-2">
      <div className="flex items-center gap-3 bg-search rounded-full px-4 py-3">
        <IoSearchOutline className="text-secondary-text" size={20} />

        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-white w-full placeholder:text-secondary-text"
        />
      </div>

      <div className="border border-border rounded-2xl mt-5 p-4">
        <h2 className="text-white font-bold text-xl">Subscribe to Premium</h2>

        <p className="text-white text-sm mt-2">
          Subscribe to unlock new features and receive a share of revenue if
          eligible.
        </p>

        <button className="mt-4 bg-primary text-white rounded-full px-5 py-2 font-bold">
          Subscribe
        </button>
      </div>

      <div className="border border-border rounded-2xl mt-5">
        <h2 className="text-white font-bold text-xl p-4">Who to follow</h2>

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex justify-between items-center px-4 py-3 hover:bg-hover cursor-pointer transition"
          >
            <div className="flex gap-3">
              <Image
                src="/globe.svg"
                width={40}
                height={40}
                alt=""
                className="rounded-full"
              />

              <div>
                <p className="text-white font-semibold">Zahra Anaya</p>

                <p className="text-secondary-text text-sm">@zahra</p>
              </div>
            </div>

            <button className="bg-white text-black rounded-full px-4 py-1.5 font-bold">
              Follow
            </button>
          </div>
        ))}
      </div>
    </aside>
  )
}
