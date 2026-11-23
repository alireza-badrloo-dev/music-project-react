
import { Route, Routes } from "react-router-dom";

import "./App.css";

import { Home } from "./layouts/Home";
import { HomePage } from "./pages/Home.page";
import { Categoriespage } from "./pages/Categories.page";
import { ArtistsPage } from "./pages/Artists.page";
import { TrackPage } from "./pages/Track.page";

function App() {
    return (
        <Routes>
            <Route element={<Home />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/categories" element={<Categoriespage />} />
                <Route path="/artists" element={<ArtistsPage />} />
                <Route path="/track/:id" element={<TrackPage />} />
            </Route>
        </Routes>
    );
}

export default App;
