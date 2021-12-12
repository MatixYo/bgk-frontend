import Loading from "@components/icons/Loading";
import Result from "@components/Results/Result";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@lib/fetcher";
import cn from "classnames";
import s from "./Result.module.css";
import FeResult from "@components/Results/FeResult";
import { useMemo } from "react";
import Link from "next/link";

function dateDifference(date: Date): number {
  return (
    new Date(new Date().getTime() - new Date(date).getTime()).getFullYear() -
    1970
  );
}

const ResultsList: React.FC = () => {
  const router = useRouter();
  const { q } = router.query;
  const url = useMemo(() => `/search?q=${q ?? ""}`, [q]);
  const { data } = useSWR(url, fetcher);

  const showCredit = useMemo(
    () => data?.company && dateDifference(data.company.established) >= 1,
    [data]
  );

  return (
    <div className="px-4">
      {!data ? (
        <Loading className="animate-spin w-12 mx-auto my-8" />
      ) : (
        <div className="w-full">
          {data.company && (
            <div className={s.company}>
              <h3 className="text-xl font-bold text-blue-600">
                {data.company.name}
              </h3>
              <div className="flex text-sm">
                <div className="flex-1">
                  <span className={s.smallTitle}>Data</span>
                  <p>
                    REGON:
                    <span
                      className={cn({
                        "underline font-bold": q === data.company.regon,
                      })}
                    >
                      {data.company.regon}
                    </span>
                  </p>
                  <p>
                    NIP:{" "}
                    <span
                      className={cn({
                        "underline font-bold": q === data.company.nip,
                      })}
                    >
                      {data.company.nip}
                    </span>
                  </p>
                  <p>{data.company.address}</p>
                  <p>
                    {data.company.zip} {data.company.city}
                  </p>
                  <p>
                    Est.:{" "}
                    {new Date(data.company.established).toLocaleDateString()} r.
                  </p>
                </div>
                <div className="flex-1 overflow-hidden">
                  <span className={s.smallTitle}>PKD</span>
                  {data.company.pkds.map((pkd: any, i: number) => (
                    <div
                      key={pkd.code}
                      className={cn({ "font-semibold": i === 0 }, "truncate")}
                    >
                      {pkd.code}. {pkd.desc}
                    </div>
                  ))}
                </div>
              </div>
              {showCredit && (
                <a
                  href="https://arp.pl/pl/dla-biznesu/finansowanie/parametryzator/"
                  target="_blank"
                  rel="noreferrer"
                  className={s.credit}
                >
                  Weź kredycik
                </a>
              )}
            </div>
          )}
          <div className="text-gray-500 mt-6 text-sm">
            Showing results for <i>{data.wordsList.join(", ")}</i>
          </div>
          {!data.rows.length && !data.feRows.length && <div>No results</div>}
          <ul className={s.list}>
            {data.feRows.slice(0, 3).map((row: any) => (
              <FeResult key={row.name} item={row} />
            ))}
            {data.rows.map((item: any) => (
              <Result key={item.content} item={item} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultsList;
