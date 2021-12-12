import s from "./Result.module.css";
import React from "react";

const Result: React.FC<{ item: any }> = ({ item }) => {
  return (
    <li className={s.result}>
      <a href={item.url} target="_blank" rel="noreferrer">
        <div
          className={s.title}
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </a>
    </li>
  );
};

export default Result;
