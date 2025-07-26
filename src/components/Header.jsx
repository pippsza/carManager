import Container from "./Container.jsx";
import Logo from "./Logo.jsx";
import Navigaion from "./Navigations.jsx";

export default function Header() {
  return (
    <header className="bg-badges ">
      <Container className="py-6 flex justify-between items-center">
        <Logo />
        <Navigaion />
      </Container>
    </header>
  );
}
