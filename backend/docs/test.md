There are a few concepts i want to learn from this codebase so let me break it down into those pieces:

1. Context-API 
2. Context-API work flow
3. useReducer hook 
4. ADD_ITEM logic 
5. REMOVE_ITEM logic 

1. Context-API:
This is a Context-API component. Here we create a cartContext Context that has a blueprint of a items array, addItem funciton and a removeItem function.

CartContextProvider is our provider function and cartContext constant in the end is the bundled up Context resource that we pass as a value to our Provider component. 

2. Context-API work flow: 
I mentioned the blueprint above, the important part which is the reducer function has our useReducer hook.
Let me explain the useReducer hook first and I will continue the Context-API workflow from there.

...detouring #2 

3. useReducer takes in a reducer function and a intiial state. Then, we declare our useReducer function which is the cartReducer. A reducer function takes a state and a action as a parameter. State is the initial state defined in the decleration of useReducer. The action later will be dispatch functions which be a function that calls a action object. 

Our function first checks for the ADD_ITEM action which contains logic for what to do when an item is added to cart. 

4. ADD_ITEM logic:

If we're adding item, first we check if the item already exists in our state. 

state.items.findIndex()
-> This runs findIndex method on our state which has items as an array. 
-> For every item which will be an object, we check the id property and see if that matches the id property of the action.item array's id property 
-> Now, we declare a updatedItems variable to store the items that we update 
-> Now, we have a constant that has the exact index of the item that matches the id of action.item 

Now, we need a logic to check what to do if we find a match. If we do, we just update the quantity property of the object rather than add an entirely new item 

If, the index is greater than -1 which means it exists, 

We map over the state.item array and we're trying to find the index of the existingItem

if there is a match we update the updatedItem variable with:
a new object with the items copied and 
the quantity property of that item incremented by 1 
and since it's a map method, this object will be in a new array

if there is no match of the index meaning....
this is where I am confused....
we're returning just the item as it is but still in a new array? 

If, the intex is not > -1 meaning it's a new Item being added:
We update the updatedItems value to a new array. 
This array: 

spreads the latest state array,
injects a new object at the end
this object copies the current action.item in question 
and to that action.item, it sets the quantity to 1

so the updatedItems variable would contain the state's latest snapshot of the items array with the new item added at the end. 

Since reducer function returns a state, we return a brand new oject with the state spread and the item array set to updatedItems

4. REMOVE_ITEM logic:

The first part is the same, we're looking for item that might already exist in the state array. 

The second if check is for error where the item just isn't there so there is nothing to return so we just return state as it is
[What is the reason we don't return [...state.item]]

Using the index of the item that we're trying to moddify, we can retreive the item iteself which is what we are doing with existingCartItem. We're storing the item in question to be modified 

Next, following the principle of React Immutability, we make a copy of the state so we can work on it. 

Now the 3rd if statement in the 'REMOVE_ITEM' action is checking if the Item in question has a quantity of just 1. If that is the case, we remove that item from our copied array updatedItems using .splice()

Else:
This means there is more than one quantity...
First access the index of the item in the updatedItems array 

Then we replace that index which is an object by keeping everything it has via ...existingCartItem, 
And we just modify the quantity by substracting 1

Again we return a new state object that spreads the current state with the items updated with the updatedItems. 

Lastly, if our code bypasses all our if checks, we just return state. 

Now going back to #2 about the Context-API workflow 

Here we now define the addItem and removeItem functions 
They take item and id respectively 

addItem dispatches a action function with type of ADD_ITEM 
removeItem dispatches a action function with type of REMOVE_ITEM



