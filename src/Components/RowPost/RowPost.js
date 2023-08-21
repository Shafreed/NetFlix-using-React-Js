import React ,{useEffect,useState} from 'react'
import Youtube from 'react-youtube'
import './RowPost.css'
import axios from '../../axios'
import {imageUrl,API_KEY} from '../../Constants/constans'
function RowPost(props) {
  const [movies,setMovies]=useState([])
  const [urlid,setUrlId]=useState('')
  useEffect(()=>{
    axios.get(props.url).then((responce)=>{
        console.log(responce.data);
        setMovies(responce.data.results)
    }).catch (err=>{
      // alert('network error')
    })
  },[])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }
  const handleClick=(id)=>{
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      if (response.data.results.length !==0){
        setUrlId(response.data.results[0])
      }else{
        console.log('trailer not available');
      }
    })
  }
  return (
       
    <div className='row'>
    <h2>{props.title}</h2>
    <div className='posters'>
      {movies.map((obj)=>
        
        <img onClick={()=>{handleClick(obj.id)}} className={props.isSmall ?'smaller':'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="Poster" />
       )}
        {/* <img className='poster' src="Image/RowPost.jpg" alt="Poster" /> */}
        {/* <img className='poster' src="Image/Hunger.jpg" alt="Poster" />
        <img className='poster' src="Image/imperial-dreams-2014.webp" alt="Poster" />
        <img className='poster' src="Image/tallulah-2016.webp" alt="Poster" />
        <img className='poster' src="Image/man.png" alt="Poster" />
        <img className='poster' src="Image/ice.jpg" alt="Poster" />
        <img className='poster' src="Image/okja-2017.jpg" alt="Poster" />
        <img className='poster' src="Image/lady.jpg" alt="Poster" />
        <img className='poster' src="Image/50m2.jpg" alt="Poster" />
        <img className='poster' src="Image/what.jpg" alt="Poster" />
        <img className='poster' src="Image/zelda.webp" alt="Poster" />
        <img className='poster' src="Image/silence.jpg" alt="Poster" />
        // <img className='poster' src="Image/harry.jpg" alt="Poster" /> */}
    </div>
    { urlid && <Youtube opts={opts} videoId={urlid.key}/>}
    </div>
  )
}

export default RowPost