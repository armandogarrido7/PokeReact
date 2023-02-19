import { BrowserRouter, Routes, Route } from "react-router-dom";
const Router = () => {
  const Home = () => <h1>Home</h1>;
  const Pokemons = () => <h1>Pokemons</h1>;
  const Play = () => <h1>Play</h1>;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="pokemons" element={<Pokemons />}></Route>
          <Route path="play" element={<Play />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;