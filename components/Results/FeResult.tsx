import s from "./Result.module.css";
import React, { useMemo } from "react";
import ReactTooltip from "react-tooltip";

const Result: React.FC<{ item: any }> = ({ item }) => {
  const id = useMemo(() => Math.random() * 100000000, []);

  return (
    <li className={s.feResult} data-tip data-for={`item-${id}`}>
      <a href={item.link} target="_blank" rel="noreferrer">
        <div className={s.title}>{item.name}</div>
        <div dangerouslySetInnerHTML={{ __html: item.content }} />
      </a>
      <ReactTooltip id={`item-${id}`} effect="solid" className="max-w-lg">
        <div dangerouslySetInnerHTML={{ __html: item.content }} />
      </ReactTooltip>
    </li>
  );
};

export default Result;
