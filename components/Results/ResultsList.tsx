import Loading from "@components/icons/Loading";
import Result from "@components/Results/Result";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@lib/fetcher";
import cn from "classnames";
import s from "./Result.module.css";

const ResultsList: React.FC = () => {
  const router = useRouter();
  const { q } = router.query;
  const { data } = useSWR(`/search?q=${q ?? ""}`, fetcher);

  return (
    <div className="px-4">
      {!data ? (
        <Loading className="animate-spin w-12 mx-auto my-8" />
      ) : !data.rows.length ? (
        <div>No results</div>
      ) : (
        <div className="w-full">
          {data.company && (
            <div>
              <h3 className="text-xl font-bold text-blue-700">
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
                    Założono:{" "}
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
            </div>
          )}
          <div className="text-gray-500 mt-6">
            Showing results for <i>{data.wordsList.join(" ")}</i>
          </div>
          <ul className="mt-2 space-y-4">
            {data.rows.map((item: any) => (
              <Result key={item} item={item} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultsList;
