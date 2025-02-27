import MealItem from "./MealItem";
import useHttp from "../custom hooks/useHttp";

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error
  } = useHttp("http://localhost:3000/meals");
  

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
