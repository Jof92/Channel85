import { Stack} from '@mui/material';

import { categories } from '../utils/constants';



const Sidebar1 = ({selectedCategory, setSelectedCategory}) => (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        heigh: { sx: 'auto', md: '95%'},
        flexDirection: {md: 'column'},
        marginRight: '10px',
      }}
    >
      {categories.map((category) => (
        <button
          className="category-btn"
          onClick={() => setSelectedCategory(category.name)}
          style={{
            background: category.name === selectedCategory && '#0049e8',
            color: 'white'
            }}
            key={category.name}

          >
          <span style={{ color: category.name === selectedCategory ? 'white' : '#0049e8', marginRight: '10px'}}>{category.icon}</span>
          <span style={{opacity: category.name === selectedCategory ? '1' :'0.8'} }>{category.name}</span>
        </button>
      ))}
    
    </Stack>
  )

export default Sidebar1