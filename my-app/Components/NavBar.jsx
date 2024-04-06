import { useEffect, useState, useContext } from "react";
import { TrackingContext } from "../Conetxt/TrackingContext";
import { Nav1, Nav2, Nav3 } from "../Components/index";

// Import the image URL
const imageUrl = "data:image/png;base64,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";

export default () => {
  const [state, setState] = useState(false);
  const { currentUser, connectWallet } = useContext(TrackingContext);

  const navigation = [
    { title: "Home ", path: "#" },
    { title: "Services", path: "#" },
    { title: "Contact Us", path: "#" },
    { title: "Erc20", path: "#" },
  ];

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <nav
      className={`bg-white pb-5 md:text-sm ${
        state
        ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
          : ""
      }`}
    >
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <a href="javascript:void(0)">
            <img
              src={imageUrl}
              width={120}
              height={50}
              alt="AgroBlocks Logo"
            />
          </a>
          <div className="md:hidden">
            <button
              className="menu-btn text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state? <Nav1 /> : <Nav2 />}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
            state? "block" : "hidden"
          } `}
        >
          <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li key={idx} className="text-gray-700 hover:text-gray-900">
                  <a href={item.path} className="block">
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            {currentUser? (
              <p className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                {currentUser.slice(0, 25)}..
              </p>
            ) : (
              <button
                onClick={() => connectWallet()}
                className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
              >
                Connect Wallet
                <Nav3 />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
