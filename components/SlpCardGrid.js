import React from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import GetAppIcon from '@material-ui/icons/GetApp';
import Stages from "../public/static/data/stages";
import useSWR from 'swr';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    alignSelf: 'center'
  },
  cover: {
    width: 100,
  },
  stock: {
    width: "1.4rem",
  },
  versus: {
    margin: 10
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial'
  }
}));

export default function SlpCardGrid() {

  const classes = useStyles();

  const fetcher = url => fetch(url).then(res => res.json());
  const { data } = useSWR("/api/files", fetcher);

  function stageNameFromId(id) {
    for (const i of Stages) {
      if (i.id === String(id))
        return i.name
    }
  }

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, day, year].join('/');
  }

  function getTimeFromFrame(lastFrame, fps) {
    let minutes = Math.floor(lastFrame/fps/60);
    let seconds = Math.floor(lastFrame/fps - minutes * 60);
    return minutes + ":" + seconds;
  }
  return(
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="stretch"
      spacing={2}
      >
      {data && data.map((file) => {
        const settings = file.settings;
        const metadata = file.metadata;
        return(
          <Grid item>
            <Card className={classes.root}>
                <CardMedia
                  className={classes.cover}
                  component="img"
                  alt="Stage"
                  src={"/static/images/stages/" + stageNameFromId(settings.stageId) + ".png"}
                  title="Stage"
                />
                <CardContent className={classes.content}>
                  <Box display="flex" flexDirection="row">
                    <Badge badgeContent="P1" color="error">
                      <Chip
                        icon={
                          <img
                            className={classes.stock} 
                            alt="Stock Icon P1"
                            src={"/static/images/characters/" + settings.players[0].characterId + "/" + settings.players[0].characterColor + "/stock.png"}
                          />
                        }
                        label={
                          <Box fontWeight="fontWeightBold" fontSize={18}>
                            {metadata.players[0].names.code}
                          </Box>
                        }
                      />
                    </Badge>
                    <Box className={classes.versus} color="text.secondary">
                      vs
                    </Box>
                    <Badge badgeContent="P2" color="primary">
                      <Chip
                        icon={
                          <img
                            className={classes.stock} 
                            alt="Stock Icon P2"
                            src={"/static/images/characters/" + settings.players[1].characterId + "/" + settings.players[1].characterColor + "/stock.png"}
                          />
                        }
                        label={
                          <Box fontWeight="fontWeightBold" fontSize={18}>
                            {metadata.players[1].names.code}
                          </Box>
                        }
                      />
                    </Badge>
                  </Box>
                  <Box color="text.secondary">
                    {formatDate(metadata.startAt) + " • " + getTimeFromFrame(metadata.lastFrame, 60)}
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton>
                    <BookmarkIcon />
                  </IconButton>
                  <IconButton href={file.url}>
                    <GetAppIcon />
                  </IconButton>
                </CardActions>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}