import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"

const AnalysisTable = ({ analysisResults }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Engine Name</TableCell>
          <TableCell>Category</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(analysisResults).map(([engine, data]) => (
          <TableRow key={engine}>
            <TableCell>{data.engine_name}</TableCell>
            <TableCell>{data.category}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const StatsTable = ({ analysisStats }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Category</TableCell>
          <TableCell>Count</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(analysisStats).map(([category, count]) => (
          <TableRow key={category}>
            <TableCell>{category}</TableCell>
            <TableCell>{count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const FileInfo = ({ data }) => {
  if (data.error) {
    return (
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="border rounded-lg border-gray-300 bg-white shadow-lg p-6">
          <div className="mt-4 mb-8 text-sm text-red-500">
            <p>Error: {data.error.message}</p>
          </div>
        </div>
      </div>
    )
  }

  const {
    attributes: {
      meaningful_name,
      last_analysis_results,
      last_analysis_stats,
      last_modification_date,
      creation_date,
      type_extension,
      sha256,
    },
  } = data.data

  const undetectedCount = Object.values(last_analysis_results).reduce(
    (count, result) => (result.category === "undetected" ? count + 1 : count),
    0
  )

  const totalResults = Object.values(last_analysis_results).length
  const undetectedPercentage = (undetectedCount / totalResults) * 100

  const isSafe = undetectedPercentage > 70

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="border rounded-lg border-gray-300 bg-white shadow-lg p-6">
        <div className="mt-4 mb-8 text-sm text-red-500">
          <p>
            Warning: This is a project and its results should not be trusted
            with 100% certainty.
          </p>
        </div>
        <h1 className="text-2xl font-semibold mb-4">
          File Report for: {meaningful_name}
          {isSafe ? (
            <span className="text-green-500 ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Safe
            </span>
          ) : (
            <span className="text-red-500 ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Not Safe
            </span>
          )}
        </h1>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">File Details</h2>
            <p>
              <span className="font-semibold">SHA256:</span> {sha256}
            </p>
            <p>
              <span className="font-semibold">Last Modification Date:</span>{" "}
              {new Date(last_modification_date).toLocaleDateString("en-US")}
            </p>
            <p>
              <span className="font-semibold">Creation Date:</span>{" "}
              {new Date(creation_date).toLocaleDateString("en-US")}
            </p>
            <p>
              <span className="font-semibold">Type Extension:</span>{" "}
              {type_extension}
            </p>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">Analysis Results</h2>
            <AnalysisTable analysisResults={last_analysis_results} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">Analysis Stats</h2>
            <StatsTable analysisStats={last_analysis_stats} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileInfo
