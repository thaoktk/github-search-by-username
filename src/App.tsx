import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { BiSearch, BiBuildings, BiMap } from "react-icons/bi";
import { IoLogoTwitter } from "react-icons/io";

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
  const [userSearch, setUserSearch] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  const dateJoinGit =
    user?.created_at == null
      ? undefined
      : new Date(user?.created_at).toDateString();

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleClickSubmitButton = () => {
    setUserSearch(username);
  };

  const buttonSubmit = useRef() as React.MutableRefObject<HTMLButtonElement>;

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        buttonSubmit.current.click();
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        if (userSearch) {
          const res = await axios.get(
            `https://api.github.com/users/${userSearch}`
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
  }, [userSearch]);

  return (
    <div className="bg-bg min-h-screen min-w-full flex justify-center items-center">
      <div className="max-w-screen-xl md:px-0 px-5 py-10 ">
        <div className="">
          <h1 className="text-3xl text-white font-medium text-center">
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
                value={username}
                onChange={handleChangeUsername}
              />
            </div>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full bg-400 flex"
              onClick={handleClickSubmitButton}
              ref={buttonSubmit}
            >
              <BiSearch className="text-white text-lg m-auto" />
            </button>
          </div>
          {error && (
            <div className="mt-8 introduce bg-100 md:w-[580px] w-full py-8 md:px-8 px-5 rounded-[50px] shadow-[4px_8px_25px_0_rgba(53, 60, 87,0.5)]">
              <h1 className="text-white text-xl text-center">
                This user is not available.
              </h1>
            </div>
          )}
          {user && (
            <div className="mt-8 introduce">
              <div className="bg-100 md:w-[580px] w-full py-8 md:px-8 px-5 rounded-[50px] shadow-[4px_8px_25px_0_rgba(53, 60, 87,0.5)]">
                <div className="flex md:flex-row flex-col md:gap-8 gap-4 items-center">
                  <div>
                    <img
                      src={user?.avatar_url}
                      alt=""
                      className="w-[90px] h-[90px] rounded-full border-2 border-white"
                    />
                  </div>
                  <div className="md:block flex flex-col items-center">
                    <span className="text-2xl text-white font-semibold block">
                      {user?.name ? user?.name : "Not Available"}
                    </span>
                    <span className="text-400 italic text-lg block md:mt-2">
                      {`@${user?.login}`}
                    </span>
                  </div>
                  <div className="flex-1 text-right text-white text-md italic">
                    Join: {dateJoinGit}
                  </div>
                </div>
                <div className="mt-7 text-center text-white font-light">
                  {user?.bio}
                </div>
                <div className="mt-7 flex flex-col gap-4 md:gap-0 md:flex-row justify-around">
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-lg text-white font-medium">
                      Repos
                    </span>
                    <span className="text-lg text-white font-medium">
                      {user?.public_repos}
                    </span>
                  </div>
                  <div className="w-px min-h-full bg-200 hidden md:block"></div>
                  <div className="w-1/2 h-px bg-200 block md:hidden mx-auto"></div>
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-lg text-white font-medium">
                      Followers
                    </span>
                    <span className="text-lg text-white font-medium">
                      {user?.followers}
                    </span>
                  </div>
                  <div className="w-px min-h-full bg-200 hidden md:block"></div>
                  <div className="w-1/2 h-px bg-200 block md:hidden mx-auto"></div>
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-lg text-white font-medium">
                      Following
                    </span>
                    <span className="text-lg text-white font-medium">
                      {user?.following}
                    </span>
                  </div>
                </div>
                <div className="mt-7 flex flex-col md:flex-row gap-5 md:gap-0 justify-around items-center">
                  <div className="flex gap-4 justify-center items-center flex-1">
                    <span className="text-300 text-lg">
                      <BiBuildings />
                    </span>
                    <span className="text-lg text-white">
                      {user?.company ? user?.company : "Not Available"}
                    </span>
                  </div>
                  <div className="flex gap-4 justify-center items-center flex-1">
                    <span className="text-300 text-lg">
                      <BiMap />
                    </span>
                    <span className="text-lg text-white">
                      {user?.location ? user?.location : "Not Available"}
                    </span>
                  </div>
                  <div className="flex gap-4 justify-center items-center flex-1">
                    <span className="text-300 text-lg">
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
