import classNames from "classnames";

export const Header = () => {
  return (
    <header>
      <div className={classNames("bg-black", "inline-block", "p-4", "mb-8")}>
        <h1 className={classNames("text-cc", "text-2xl", "font-bold")}>
          people of codecentric
        </h1>
      </div>
    </header>
  );
};
