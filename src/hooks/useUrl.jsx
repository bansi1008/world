import { useSearchParams } from "react-router-dom";

export function useUrl() {
  const [search, setsearch] = useSearchParams();
  const lat = search.get("lat");
  const lng = search.get("lng");

  return [lat, lng, lng];
}
