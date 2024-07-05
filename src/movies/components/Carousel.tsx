
import { Box, Skeleton, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import  { FC, Suspense } from 'react'
import {  MoviesResponse } from '../interfaces';
import { suspend } from 'suspend-react';


interface Props {
  title:string;
  slug:string;
}

const Loader: FC<Props>=({title,slug})=>{
  return(
  <Box sx={{marginBottom:6}}>
        <Typography fontWeight={600} sx={{color:"white", fontSize:"20", marginBottom:2, textAlign:"center"}}>
           {title}
        </Typography>
    <Swiper
    modules={[Navigation]}
    spaceBetween={10}
    slidesPerView={4}
    navigation
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
  >
        
    {
          Array.from({length:10}).map((_,i)=>(
            <SwiperSlide className='cards' key={`${slug}${i}`}>
              <Box sx={{width:'100%', height:'100%', aspectRatio:'1/1'}}>
          <Skeleton variant='rounded' className='w-full h-full object-cover' style={{backgroundColor:'#cecece', width:"100%",height:"100%"}}/>
          </Box>
        </SwiperSlide>
        
       ) )
         }

    </Swiper>
    </Box>
  )
}

const Carousel: FC<Props>=({title,slug})=> {
    // const [movies, setMovies] = useState<MovieShort[]>([]);
   const sleep = (time_miliseconds:number)=>{
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(1)
      },time_miliseconds)
    })    
    }
    const movies=suspend(async ()=>{
      await sleep(2200)
      const url = `${import.meta.env.VITE_API_URL}${slug}api_key=${import.meta.env.VITE_KEY_API}`
      const res =await fetch(url);
      const data:MoviesResponse = await res.json();
   return data.results
  
    },[slug]);

    return(
      <Box sx={{marginBottom:6}}>
            <Typography fontWeight={600} sx={{color:"white", fontSize:"20", marginBottom:2, textAlign:"center"}}>
               {title}
            </Typography>
        <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={4}
        navigation
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
            
        {
              movies.map(movie=>(
                <SwiperSlide key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                </SwiperSlide>
              ))
             }
    
        </Swiper>
        </Box>
      )
}


export const CarouselSuspense:FC<Props> =({title,slug})=>{

  return (
    <Suspense fallback={<Loader title={title} slug={slug}/>}> 
    <Carousel title={title} slug={slug}/>
    </Suspense>
  )
}