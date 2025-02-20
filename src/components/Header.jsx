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
