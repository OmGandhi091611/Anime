/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import '../src/components/style.css';
import AddtoList from "./components/AddtoList";
import AnimeInfo from "./components/AnimeInfo";
import AnimeList from "./components/AnimeList";
import RemoveFromList from "./components/RemoveFromList";
function App() {
  const [search, setSearch] = useState('');
  const [animeData, setAnimeData] = useState();
  const [animeInfo, setAnimeInfo] = useState();
  const [myAnimeList, setMyAnimeList] = useState([]);
  const addTo=(anime) => {
    const index = myAnimeList.findIndex((myanime) => {
      return myanime.mal_id === anime.mal_id
    })
    if(index < 0) {
      const newArray=[...myAnimeList, anime]
      setMyAnimeList(newArray);
    }
  }
  const removeFrom=(anime) => {
    const newArray = myAnimeList.filter((myanime) => {
      return myanime.mal_id !== anime.mal_id;
    });
    setMyAnimeList(newArray);
  }
  const getData = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=5`);
    const resData = await res.json();
    setAnimeData(resData.data);
  }
  useEffect(() => {
    getData();
  }, [search]);
  return (
    <>
      <div className="header">
        <h1>My Anime List</h1>
        <div className="search-box">
          <input type="search" placeholder="Search Your Anime"
          onChange={(e)=>setSearch(e.target.value)} />
        </div>
      </div>
      <div className="container">
        <div className="animeInfo">
          {animeInfo && <AnimeInfo animeInfo={animeInfo} />}
        </div>
        <div className="anime-row">
          <h2 className="text-heading">Anime</h2>
          <div className="row">
            <AnimeList 
            animelist={animeData}
            setAnimeInfo={setAnimeInfo}
            animeComponent={AddtoList}
            handleList={(anime) => addTo(anime)}
            />
          </div>
          <h2 className="text-heading">My List</h2>
          <div className="row">
            <AnimeList 
            animelist={myAnimeList}
            setAnimeInfo={setAnimeInfo}
            animeComponent={RemoveFromList}
            handleList={(anime) => removeFrom(anime)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;