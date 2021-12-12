import { FC, memo, useRef } from "react";
import cn from "classnames";
import s from "./Searchbar.module.css";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

interface Props {
  className?: string;
  id?: string;
}

const Searchbar: FC<Props> = ({ className, id = "search" }) => {
  const router = useRouter();
  const inputRef = useRef<any>(null);

  const handleSubmit = (q: string) => {
    router.push(
      {
        pathname: `/results`,
        query: q ? { q } : {},
      },
      undefined,
      { shallow: true }
    );
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === "Enter") {
      const q = e.currentTarget.value;
      handleSubmit(q);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    const q = inputRef.current?.value;
    handleSubmit(q);
  };

  return (
    <motion.div className="flex" layoutId="search">
      <div className={cn(s.root, className)}>
        <label className="hidden" htmlFor={id}>
          Search
        </label>
        <input
          id={id}
          className={s.input}
          placeholder="Search by NIP, PKD or phrase"
          defaultValue={router.query.q}
          ref={inputRef}
          onKeyUp={handleKeyUp}
          autoComplete="off"
        />
        <div className={s.iconContainer} onClick={handleClick}>
          <svg className={s.icon} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            />
          </svg>
          Find
        </div>
      </div>
    </motion.div>
  );
};

export default memo(Searchbar);
