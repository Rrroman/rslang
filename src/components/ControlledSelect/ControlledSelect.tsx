import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWordsList } from '../../actions/word-actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

export default function ControlledOpenSelect() {
  const classes = useStyles();
  const [level, setLevel] = React.useState<string | number>('');
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const chosenLevel = event.target.value as number;
    setLevel(chosenLevel);
    dispatch(fetchWordsList({ page: 0, group: chosenLevel }));
  };

  useEffect(() => {
    dispatch(fetchWordsList({ page: 0, group: 0 }));
  }, []);
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Уровень</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={level}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Уровень</em>
          </MenuItem>
          <MenuItem value={0}>A1</MenuItem>
          <MenuItem value={1}>A2</MenuItem>
          <MenuItem value={2}>A2+</MenuItem>
          <MenuItem value={3}>B1</MenuItem>
          <MenuItem value={4}>B2</MenuItem>
          <MenuItem value={5}>B2+</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
