import s from "./Result.module.css";
import React from "react";

const Result: React.FC<{ item: any }> = ({ item }) => {
  return (
    <li className={s.root}>
      <div
        className={s.title}
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
    </li>
  );
};

export default Result;
