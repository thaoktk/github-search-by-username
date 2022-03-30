import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { BiSearch, BiBuildings, BiMap } from "react-icons/bi";
import { IoLogoTwitter } from "react-icons/io";
import { debounce } from "lodash";

interface User {
  avatar_url: string | undefined;
  name: string;
  login: string;
  bio: string | undefined;
  public_repos: number;
  followers: number;
  following: number;
  company: string | undefined;
  location: string | undefined;
  twitter_username: string | undefined;
  created_at: Date;
}

function App() {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  const dateJoinGit =
    user?.created_at == null
      ? undefined
      : new Date(user?.created_at).toDateString();

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setUser(undefined);
    }
    debouncedInput(e.target.value);
  };

  const debouncedInput = useCallback(
    debounce((name: string) => setUsername(name), 500),
    []
  );

  useEffect(() => {
    const getUsers = async () => {
      try {
        if (username) {
          const res = await axios.get(
            `https://api.github.com/users/${username}`
          );
          setUser(res.data);
          setError(false);
        }
      } catch (e) {
        setError(true);
        setUser(undefined);
      }
    };
    getUsers();
  }, [username]);

  return (
    <div className="flex items-center justify-center min-w-full min-h-screen bg-bg">
      <div className="max-w-screen-xl px-5 py-10 md:px-0 ">
        <div className="">
          <h1 className="text-3xl font-medium text-center text-white">
            Github Search by Username
          </h1>
        </div>
        <div className="mt-8">
          <div className="relative">
            <div className="">
              <input
                className="border-none outline-none bg-200 py-3 px-5 rounded-full md:w-[580px] w-full text-lg text-white"
                type="text"
                placeholder="Search"
                onChange={handleChangeUsername}
              />
            </div>
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full bg-400 flex">
              <BiSearch className="m-auto text-lg text-white" />
            </button>
          </div>
          {error && (
            <div className="mt-8 introduce bg-100 md:w-[580px] w-full py-8 md:px-8 px-5 rounded-[50px] shadow-[4px_8px_25px_0_rgba(53, 60, 87,0.5)]">
              <h1 className="text-xl text-center text-white">
                This user is not available.
              </h1>
            </div>
          )}
          {user && (
            <div className="mt-8 introduce">
              <div className="bg-100 md:w-[580px] w-full py-8 md:px-8 px-5 rounded-[50px] shadow-[4px_8px_25px_0_rgba(53, 60, 87,0.5)]">
                <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
                  <div>
                    <img
                      src={user?.avatar_url}
                      alt=""
                      className="w-[90px] h-[90px] rounded-full border-2 border-white"
                    />
                  </div>
                  <div className="flex flex-col items-center md:block">
                    <span className="block text-2xl font-semibold text-white">
                      {user?.name ? user?.name : "Not Available"}
                    </span>
                    <span className="block text-lg italic text-400 md:mt-2">
                      {`@${user?.login}`}
                    </span>
                  </div>
                  <div className="flex-1 italic text-right text-white text-md">
                    Join: {dateJoinGit}
                  </div>
                </div>
                <div className="font-light text-center text-white mt-7">
                  {user?.bio}
                </div>
                <div className="flex flex-col justify-around gap-4 mt-7 md:gap-0 md:flex-row">
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-lg font-medium text-white">
                      Repos
                    </span>
                    <span className="text-lg font-medium text-white">
                      {user?.public_repos}
                    </span>
                  </div>
                  <div className="hidden w-px min-h-full bg-200 md:block"></div>
                  <div className="block w-1/2 h-px mx-auto bg-200 md:hidden"></div>
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-lg font-medium text-white">
                      Followers
                    </span>
                    <span className="text-lg font-medium text-white">
                      {user?.followers}
                    </span>
                  </div>
                  <div className="hidden w-px min-h-full bg-200 md:block"></div>
                  <div className="block w-1/2 h-px mx-auto bg-200 md:hidden"></div>
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-lg font-medium text-white">
                      Following
                    </span>
                    <span className="text-lg font-medium text-white">
                      {user?.following}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-around gap-5 mt-7 md:flex-row md:gap-0">
                  <div className="flex items-center justify-center flex-1 gap-4">
                    <span className="text-lg text-300">
                      <BiBuildings />
                    </span>
                    <span className="text-lg text-white">
                      {user?.company ? user?.company : "Not Available"}
                    </span>
                  </div>
                  <div className="flex items-center justify-center flex-1 gap-4">
                    <span className="text-lg text-300">
                      <BiMap />
                    </span>
                    <span className="text-lg text-white">
                      {user?.location ? user?.location : "Not Available"}
                    </span>
                  </div>
                  <div className="flex items-center justify-center flex-1 gap-4">
                    <span className="text-lg text-300">
                      <IoLogoTwitter />
                    </span>
                    <span className="text-lg text-white">
                      {user?.twitter_username
                        ? user?.twitter_username
                        : "Not Available"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
