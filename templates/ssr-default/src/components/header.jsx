import { NavLink } from "react-router-dom";

const pages = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Posts", link: "/posts" },
];

export default function Header() {
  return (
    <div className="header">
      {pages.map((page) => (
        <NavLink
          key={page.title}
          className={({ isActive, isPending }) =>
            isPending ? "link pending" : isActive ? "link active" : "link"
          }
          to={page.link}
        >
          {page.title}
        </NavLink>
      ))}
    </div>
  );
}
