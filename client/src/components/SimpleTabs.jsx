import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { Container } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const i = 0;
function generate(element) {
  return [i].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));


export default function SimpleTabs(props) {
  const classes = useStyles();
  // const [value, setValue] = React.useState(0);
  const [value, setValue] = React.useState(props.name);
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const handleChange = (event) => {
    //alert(newValue);
    //setValue(newValue);
    setValue(event.target.value);
  };

  return (
    <Container>

      {/* <TextareaAutosize
        name="textarea"
        rowsMax={6}
        aria-label="maximum height"
        placeholder="Write something here..."
        value={value}
        onBlur={handleChange}
      />
      <Fab color="primary" aria-label="add" onClick={addData}>
        <AddIcon />
      </Fab> */}
  <iframe name="hiddenFrame" className="hide"></iframe>
      <form id="noter-save-form" action="" method="POST" target="hiddenFrame">
            <textarea id="noter-text-area" placeholder="Write something here..." name="textarea" value={value} onChange={handleChange} />
            <input type="submit" value="Save" />
        </form>

      {/* <h1> My box of Joy and Learnings:</h1>
      {value}
      <IconButton edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <IconButton edge="end" aria-label="delete">
        <EditIcon />
      </IconButton>
      <br /> */}

    </Container>

  );
}
