import { useLocation, useHistory } from "react-router-dom";

export function useQuery() {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  function jumpTo(query, pathname = location.pathname) {
    history.push(pathname + "?" + query.toString());
  }
  function getQuery(name) {
    return query.get(name) || "";
  }
  return { query, jumpTo, getQuery };
}
