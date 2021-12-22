import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

interface ActiveLinkProps extends LinkProps {
    activeClassName: string
}

export const ActiveLink: FC<ActiveLinkProps> = ({ activeClassName, ...props }) => {

    const { asPath } = useRouter();

    return (
        <Link {...props}>
            <a className={props.href === asPath ? activeClassName : ""}>
                {props.children}
            </a>
        </Link>
    )
}