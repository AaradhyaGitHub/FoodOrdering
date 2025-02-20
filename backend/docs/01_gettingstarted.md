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
import logoImg from '../assets/logo.jpg'

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Dining table at a resturant"/>
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
Now that we have our basic structure working, we'll need to:
1. Style our components
2. Add more meal details to display
3. Implement cart functionality
4. Build the checkout form

Let me know when you're ready to move on to the next part of the implementation!