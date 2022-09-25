import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ButtonLink } from "./ButtonLink";
import { LanguageLink } from "./LanguageLink";

type LanguageSelectorProps = {
  languages: string[];
};

export const LanguageSelector = (props: LanguageSelectorProps) => {
  const {
    query: { language },
  } = useRouter();

  const [filter, setFilter] = useState("");
  return (
    <div className={classNames("mb-8")}>
      <h2 className={classNames("font-bold", "text-xl")}>Filter by language</h2>
      <div className={classNames("text-xl", "mb-2")}>
        Show members who know{" "}
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={classNames(
            "font-bold",
            "border-b-2",
            "border-black",
            "focus:border-cc",
            "focus:outline-none"
          )}
        />
        , sorted by number of language repositories.
      </div>
      <div>
        {language !== undefined && (
          <Link href="/" passHref>
            <ButtonLink dark onClick={() => setFilter("")}>
              &#8634; Reset Filter
            </ButtonLink>
          </Link>
        )}
        {filter &&
          props.languages
            .filter((language) =>
              language.toLowerCase().includes(filter.toLowerCase())
            )
            .map((language, i) => (
              <LanguageLink
                key={i}
                language={language}
                onClick={() => setFilter(language)}
              />
            ))}
      </div>
    </div>
  );
};
