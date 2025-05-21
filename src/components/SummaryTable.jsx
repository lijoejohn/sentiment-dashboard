export const SummaryTable = ({ data }) => {
  if (!data.length)
    return <p>Click on the Regions to get the summary</p>;

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">{data[0]?.Country}</h2>
      <table className="w-full text-left table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1">Country</th>
            <th className="border border-gray-300 px-2 py-1">Region</th>
            <th className="border border-gray-300 px-2 py-1">Sentiment</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ Country, Region, value }, idx) => (
            <tr key={idx} className="hover:bg-gray-100 cursor-pointer">
              <td className="border border-gray-300 px-2 py-1">{Country}</td>
              <td className="border border-gray-300 px-2 py-1">{Region}</td>
              <td className="border border-gray-300 px-2 py-1">
                {value === "2"
                  ? "Positive"
                  : value === "1"
                  ? "Neutral"
                  : "Negative"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};