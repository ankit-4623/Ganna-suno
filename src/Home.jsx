import SongData from '../api/songData.json'
import { Card } from './component/ui/songCard'

export const Home = () =>{
    
    return (
        <>
        <h1>Song List</h1>
        <ul className="container grid grid-four--cols">
   {
    SongData.map((cur) =>{
       return <Card key={cur.id} curSong={cur} />
    })
   }
    </ul>
        </>
    )
}