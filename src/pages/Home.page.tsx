
import { Genres } from "../components/genres/Genres";
import { Tracks } from "../components/tracks/Tracks";
import { MusicSlider } from "../components/musicSlider/MusicSlider";


export function HomePage() {

    return (
        <>
            <MusicSlider />
            <Genres />
            <Tracks />
        </>
    )
}