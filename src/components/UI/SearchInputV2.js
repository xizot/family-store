import { alpha, InputBase, makeStyles } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: (props) => (props?.border ? '1px solid #ddd' : 'none'),
    backgroundColor: (props) => props.backgroundColor || alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: (props) => props.backgroundColor || alpha(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const SearchInputV2 = ({ border, initialValue, onChange }) => {
  const { t } = useTranslation();
  const classes = useStyles({ border });

  const [searchInput, setSearchInput] = useState(initialValue);

  const searchChangeHandler = (e) => {
    setSearchInput(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.searchIcon}>
        <Search />
      </div>
      <InputBase
        placeholder={t('searchPlaceHolder')}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        value={searchInput}
        onChange={searchChangeHandler}
      />
    </div>
  );
};

export default SearchInputV2;
