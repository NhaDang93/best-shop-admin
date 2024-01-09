import { dispatch } from '@/store/app-dispatch';
import { search, setSearch } from '@/store/slices/app';
import { HomeOutlined, SearchOutlined } from '@mui/icons-material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { IconButton, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SearchStyled = styled(TextField)(({ theme }) => ({
  background: theme.palette.background.paper,
  fontSize: '12px',
  minWidth: '50vw',
  height: '30px',
  borderRadius: '6px',
  '.MuiInputBase-root': {
    height: '30px',
  },
}));

const IconHomeStyled = styled(HomeOutlined)(({ theme }) => ({
  color: '#fff',
}));

const SearchInput = () => {
  const router = useRouter();

  const searchSelector: string = useSelector(search);

  const [searchValue, setSearchValue] = useState('');

  const handleGotoPage = () => {
    router.push('/');
    window?.location?.reload();
  };
  const handleEnter = (e: string) => {
    setSearchValue(e);
    dispatch(setSearch(e ?? ''));
  };

  useEffect(() => {
    if (searchValue !== searchSelector) {
      setSearchValue(searchSelector);
    }
  }, [searchSelector]);

  const handleChange = (e: any) => {
    setSearchValue(e?.target?.value ?? '');
  };

  const handleReset = () => {
    setSearchValue('');
    dispatch(setSearch(''));
  };

  return (
    <Stack flexDirection="row" alignItems="center">
      <SearchStyled
        className="input-search"
        variant="outlined"
        placeholder="Search for items"
        value={searchValue}
        onChange={handleChange}
        onKeyPress={(e: any) => {
          if (e.key === 'Enter') {
            handleEnter(e?.target?.value ?? '');
          }
        }}
      />

      <IconButton onClick={() => handleEnter(searchValue ?? '')}>
        <SearchOutlined
          style={{
            backgroundColor: 'white',
          }}
          color="secondary"
        />
      </IconButton>

      <IconButton onClick={handleReset}>
        <RestartAltIcon
          style={{
            backgroundColor: 'white',
          }}
          color="secondary"
        />
      </IconButton>
      <IconHomeStyled onClick={handleGotoPage} />
    </Stack>
  );
};

export default SearchInput;
