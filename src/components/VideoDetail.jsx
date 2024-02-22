import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import {Videos} from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => setVideoDetail(data.items[0]));

    fetchFromAPI(`videos?part=snippet&id=${id}`).then((data) => {
      const channelId = data.items[0]?.snippet?.channelId;
      
      
    fetchFromAPI(`channels?part=snippet&id=${channelId}`).then((channelData) => setChannelDetail(channelData.items[0]));
    });

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((data) => setVideos(data.items));
  }, [id]);

  if (!videoDetail?.snippet || !channelDetail || !channelDetail.snippet) return 'Loading...';

  const { snippet, statistics } = videoDetail || {};
  const { title, channelId, channelTitle } = snippet || {};
  const { viewCount, likeCount } = statistics || {};

  return (
    <Box minHeight="85vh">
      <Stack direction={{ xs: 'column', md:'row'}}>
        <Box flex={1}>
          <Box sx={{ width:{ xs: '98%', md:' 95%'}, position: 'sticky', top:'86px', marginLeft: 'auto', marginRight: 'auto'}}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}className="react-player"  controls/>
            {title && (
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
          )}
            <Stack direction="row" justifyContent="space-between" sx={{ color: '#fff' }} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: 'subtitle1', md: 'h6'}} color="#fff" fontSize='22px'display="flex" alignItems="center" ml='auto' mr='auto'>
                <img
                    src={channelDetail.snippet?.thumbnails?.high?.url || 'URL_PADRAO_DA_IMAGEM'}
                    alt="Channel Thumbnail"
                    style={{  borderRadius: '20%', height: '40px', width: '40px', marginRight: '5px' }}
                  />
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: '12px', color: 'green', ml: '5px'}}/>
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7}} ml='50px'>
                <span role="img" aria-label="view" >📺</span>
                {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7}} ml='50px'>
                  <span role="img" aria-label="like">👍</span>{parseInt(likeCount).toLocaleString()}  likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
          <Box px={2} py={{md: 1, xs: 5}} justifyContent="center" alignItems="center">
              <Videos videos={videos} direction="column"/>
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail