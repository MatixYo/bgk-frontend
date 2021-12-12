import Loading from "@components/icons/Loading";
import Result from "@components/Results/Result";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@lib/fetcher";

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
              <span className="uppercase tracking-wide text-xs font-black">
                Company
              </span>
              <h3 className="text-xl font-bold">{data.company.name}</h3>
              <div>NIP: {data.company.nip}</div>
              <div>REGON: {data.company.regon}</div>
            </div>
          )}
          <div className="text-gray-500 mt-6">Showing results for {q}</div>
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
