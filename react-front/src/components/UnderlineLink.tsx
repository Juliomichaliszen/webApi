import Link from "next/link";

type UnderlineLinkProps = {
  to: string;
  text: string;
};

function UnderlineLink({ text, to }: UnderlineLinkProps) {
  return (
    <Link className="underline text-xs" href={to}>
      {text}
    </Link>
  );
}

export default UnderlineLink;
