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
    <div className="my-4 max-w-lg mx-auto">
      {!data ? (
        <Loading className="animate-spin w-12 mx-auto my-8" />
      ) : (
        <div>
          {data.company && (
            <div>
              <h3 className="text-xl font-bold text-blue-700">
                {data.company.name}
              </h3>
              <div className="flex text-sm">
                <div className="flex-1">
                  <span className={s.smallTitle}>Company</span>
                  <div>NIP: {data.company.nip}</div>
                  <div>REGON: {data.company.regon}</div>
                  <div>{data.company.address}</div>
                  <div>
                    {data.company.zip} {data.company.city}
                  </div>
                  <div>
                    Założono:{" "}
                    {new Date(data.company.established).toLocaleDateString()} r.
                  </div>
                </div>
                <div className="flex-1">
                  <span className={s.smallTitle}>PKD</span>
                  {data.company.pkds.map((pkd: any, i: number) => (
                    <div
                      key={pkd.code}
                      className={cn({ "font-semibold": i === 0 })}
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
