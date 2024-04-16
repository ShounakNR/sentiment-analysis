import { fetchRecords } from '@/app/lib/actions';

export default async function HomePage() {
  const formatDateToLocal = (
    dateStr: string,
    locale: string = 'en-US',
  ) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
  };
  const records = await fetchRecords();
  console.log(records)
  return (
    <main className="flex flex-col items-center justify-center p-12 lg:w-full">
      <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="rounded-lg text-left text-sm font-normal">
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Text
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Sentiment
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Score
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {records?.rows.map((record) => (
            <tr
              key={record.id}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              <td className="whitespace-nowrap px-3 py-3">
                {record.search_text}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                <p className={record.sentiment === 'Positive' ? 'text-green-400' : (record.sentiment === 'Negative' ? 'text-red-400' :  'text-yellow-400')}>
                  {record.sentiment}
                </p>
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {record.score}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {formatDateToLocal(record.date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

