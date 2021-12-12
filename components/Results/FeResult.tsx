import s from "./Result.module.css";
import React from "react";

const Result: React.FC<{ item: any }> = ({ item }) => {
  return (
    <li className={s.feResult}>
      <a href={item.link} target="_blank" rel="noreferrer">
        <div className={s.title}>{item.name}</div>
        <div dangerouslySetInnerHTML={{ __html: item.content }} />
      </a>
    </li>
  );
};

export default Result;
