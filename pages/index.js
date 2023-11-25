import InputField from '../src/components/InputField';
import ImageInput from '../src/components/ImageInput';
import AudioInput from '../src/components/AudioInput';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {
  return (
      <div>
        <h1>retain</h1>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>
              <InputField />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <ImageInput />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <AudioInput />
            </Item>
          </Grid>
        </Grid>
      </Box>
      </div>
  )
}
