import Link from "next/link";
import { ButtonLink } from "./ButtonLink";

type LanguageLinkProps = {
  language: string;
  onClick: () => void;
};
export const LanguageLink = (props: LanguageLinkProps) => {
  return (
    <Link
      href={{
        pathname: "/",
        query: {
          language: props.language,
        },
      }}
      passHref
    >
      <ButtonLink onClick={props.onClick}>{props.language}</ButtonLink>
    </Link>
  );
};
