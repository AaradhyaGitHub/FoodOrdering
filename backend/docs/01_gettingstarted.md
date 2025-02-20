# Building a Food Ordering App with React

## Initial Planning and Project Structure

Let's start by sketching out what we want to build. Our app will have:

- Multiple meal pictures fetched from a backend
- A header with a cart button that opens a modal (shows order summary)
- A checkout feature with a form

### Project Roadmap

Here's our step-by-step plan:

1. Add the Header Component
2. Add meals-related components
3. Add logic to fetch meals from backend
4. Add cart logic (CRUD operations)
5. Add checkout page logic

## Getting Started

### Setting Up Our First Component

First, let's create our basic structure:

1. Create a `components` folder under `src`
2. Create `Header.jsx` inside components folder

Here's our first component implementation:

```jsx
// components/Header.jsx
import logoImg from "../assets/logo.jpg";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Dining table at a resturant" />
        <h1>Foodie</h1>
      </div>
      <nav>
        <button>Cart (0)</button>
      </nav>
    </header>
  );
}
```

Import and use this component in App.jsx:

```jsx
// App.jsx
import Header from "./components/Header";
import Meals from "./components/Meals";

function App() {
  return (
    <>
      <Header />
      <Meals />
    </>
  );
}

export default App;
```

## Building the Meals Component

### Setting Up Data Fetching

Now, let's display the meals. Create `Meals.jsx` in the components folder. The idea is to fetch meals data from our dummy backend, which has a meals endpoint.

Here's what we need to consider:

1. **Making HTTP Requests**:

   - Use `fetch()` with URL "http://localhost:3000/meals"
   - Need to await this request (takes time to fetch)
   - Can't make component function async directly
   - Need a separate async function for fetching

2. **Handling the Response**:

   - Check if response is okay: `if(!response.ok)`
   - Convert response to JSON (also needs await)
   - Will add try-catch error handling later

3. **State Management**:

   - Data won't be available immediately
   - Need UI handling for loading state
   - Use useState: `const [loadedMeals, setLoadedMeals] = useState([])`

4. **Preventing Infinite Loops**:
   - Can't call fetch directly in component
   - Would cause: render → fetch → state update → render → fetch...
   - Solution: Use useEffect

Here's our implementation:

```jsx
// components/Meals.jsx
import { useState, useEffect } from "react";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");
      if (!response.ok) {
        return;
      }
      const meals = await response.json();
      setLoadedMeals(meals);
    }
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
}
```

### Technical Note

Why don't we need state updating functions in useEffect dependencies?

- React guarantees these functions remain stable
- They don't need to be included in the dependency array

## Next Steps

Now that we have our basic structure working, we can implement a `MealItem` Componenet:

```jsx
export default function MealItem({ meal }) {
  return (
    <li className="meal-item">
      <article>
        <img src={meal.image} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <button>Add to Cart</button>
        </p>
      </article>
    </li>
  );
}
```

Next, this might be a little overkill but we can create a utility function to format our prices

```js
export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});
```

This can allow us to use this formatter in our components as such:

```jsx
import { currencyFormatter } from "../util/formatting";

export default function MealItem({ meal }) {
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <button>Add to Cart</button>
        </p>
      </article>
    </li>
  );
}
```

---

## Creating a flexible Button element
We know we will have various buttons in our App so it makes sense to have one generic button Component that is styled differently.

## UI Folder inside `components`
At the end of the day, all components are UI blocks but it makes sense to take more generic UI components like this button inisde a `UI` folder inside `components` folder

Here is the implementation of a generic button Component inside the new `UI` folder: 

```jsx
export default function Button({ children, textOnly, className, ...props }) {
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += " " + className;
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
```
---

## Using custom <Button>

In the `MealItem` componenet where the button is just a generic button, we can show it as: 

```jsx
<Button>Add to Cart</Button>
```
In the `Header` component where the button is a text, we can implement it as: 

```jsx
<Button textOnly>Cart (0)</Button>
```

Just declaring the `textOnly` prop sets it as `true`. So back in the `Button` component, the `text-button` CSS class is applied dynamically. 
