import React, { useEffect, useState} from "react";
import './App.css';
import YouTubeIcon from '@material-ui/icons/YouTube';
import SearchIcon from '@material-ui/icons/Search';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import useHistory from "use-history";


var cardStyle = {
  display: 'block',
  width: '320px',
  transitionDuration: '0.3s',
  height: '280px',
  backgroundColor: "#f5f2f2" 
}

function App() {

  const [skey, setSearch] = useState("");
  const [result, setmethod] = useState([])

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!skey || skey.length === 1) return;
  
    async function fetchData() {
      await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=16&q=${skey}&type=video&key=${process.env.REACT_APP_API_KEY}`
      ).then(response => {
          
        return response.json()
        }).then(data => {
          setmethod(data ? data.items : {})
        })
    }
    fetchData();
  };

  useEffect(() => {
  async function fetchtrendData() {
    await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=16&q=songs&type=video&key=${process.env.REACT_APP_API_KEY}`
    ).then(response => {
      return response.json()
      }).then(data => {
        setmethod(data ? data.items : {})
      })
  }
    if(!skey) fetchtrendData();
  }, []);




  return (
    <div className="App">
      <div className="App-header" onClick={() => window.scroll(0, 0)}>
        <div className='logo'>
          <YouTubeIcon />
        </div>
        <form id='searchform' onSubmit={handleSubmit}>
          <input type="text" value={skey} onChange={(e) => {setSearch(e.target.value)}} id="searchtext" placeholder="search here" />
          <button type='submit'><SearchIcon/></button>
        </form>
        
      </div>
      <div className="body">
        {result.map((ques, i) => 
          <div className="pldetails">
            <a href={"http://www.youtube.com/watch?v="+ques.id.videoId} id="href">
          <Card sx={{ maxWidth: 320 }} style={cardStyle}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={ques.snippet.thumbnails.medium.url}
          alt="thumbnail"
        />
        <CardContent >
          <Typography gutterBottom variant="h7" component="div" id="title">
            {/* <Box fontWeight='fontWeightMedium' display='inline'> */}
              {ques.snippet.title}
            
          </Typography>
          <Typography variant="body4" color="text.secondary">
            {ques.snippet.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></a>

            <div><br/></div>
          </div>
      )}
      </div>

          
      </div>
  );
}

export default App;
