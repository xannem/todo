import UserDisplay from "./components/UserDisplay";
import { useQuery } from "urql";
import { GetUsersDocument } from "./graphql/generated";

function App() {
  const [results, setResults] = useQuery({
    query: GetUsersDocument,
  });

  return (
    <div className="bg-blue-100 h-screen w-full p-5 overflow-scroll">
      <div className="w-full p-5">
        <h1 className="text-3xl font-sans-serif  font-light	"> To-Do Lists</h1>
      </div>
      <div className="flex flex-wrap justify-center">
        {results.data?.users.map((user, i) => (
          <UserDisplay user={user} key={i} />
        ))}
      </div>
    </div>
  );
}

export default App;
