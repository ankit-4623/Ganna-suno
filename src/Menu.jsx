import './index.css';
import { SongCard } from './Song';
import SongData from '../api/songData.json'
import { MasterPlay } from './MasterPlay';
export const Menu = () => {
    return (
        <>
            <div className="menu_side">
                <h1>Songs</h1>
                <div className="playlist">
                    <h4 className="active">
                     
                        {/* <i className="bi bi-file-music-fill"></i> Playlist */}
                    </h4>
                    
                </div>
               {
                SongData.map((cur,i) =>{
                  return(  <><SongCard key={i} SongData={cur}/>
                  
                  </>
                  )
                })
            }
            {/* <MasterPlay/> */}
            

            </div>
        </>
    );
};
