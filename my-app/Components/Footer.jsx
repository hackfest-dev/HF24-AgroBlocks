import { Fot1, Fot2 } from "../Components/index";

export default () => {
  const footerNavs = [
    {
      href: "javascript:void()",
      name: "Terms",
    },
    {
      href: "javascript:void()",
      name: "License",
    },
    {
      href: "javascript:void()",
      name: "Privacy",
    },
    {
      href: "javascript:void()",
      name: "About us",
    },
  ];
  return (
      <footer className="mt-auto">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="justify-between sm:flex">
            <div className="space-y-2">
              <p className="max-w-md">
                The line between disorder and order lies in logistics…
              </p>
              <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
                {footerNavs.map((item, idx) => (
                  <li key={idx} className="text-gray-800 hover:text-gray-500 duration-150">
                    <a href={item.href}>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 py-6 border-t text-center">
            <p>© AgroBlocks. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
};
