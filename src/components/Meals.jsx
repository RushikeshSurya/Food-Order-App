import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching Meals...</p>;
  }
  if (error) {
    return <Error title="Failed To Fetch Meals..." message={error} />;
  }
  return (
    <ul id="meals">
      {loadedMeals.map((item) => (
        <MealItem key={item.id} meal={item} />
      ))}
    </ul>
  );
}
