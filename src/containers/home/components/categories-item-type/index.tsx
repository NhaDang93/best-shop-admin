import { dispatch } from '@/store/app-dispatch';
import { setSearch } from '@/store/slices/app';
import { ListItemButton, ListItemText, styled } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-scroll';

interface CategoriesItemTypeProps {
  name: string;
  id: string;
  index: number;
  idFirstCategory: string;
}

const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
  fontSize: '16px',
  display: 'block',
  borderRadius: '0.5rem',
  position: 'relative',
  overflow: 'hidden',
  lineHeight: '40px',
  textOverflow: 'ellipsis',
  margin: '0',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  marginTop: '4px',
  marginBottom: '8px',
  transition:
    'border-color .3s,background .3s,padding .3s cubic-bezier(.645,.045,.355,1)',

  ':hover': {
    backgroundColor: '#f46a6a',
    '.MuiTypography-root': {
      color: 'white !important',
    },
  },
}));

export default function CategoriesItemType({
  name,
  id,
  index,
  idFirstCategory,
}: CategoriesItemTypeProps) {
  const [active, setActive] = useState('');
  const onSetActive = (e: number) => {
    setActive(e.toString());
    const element = document.getElementById(
      `ca${idFirstCategory}`
    ) as HTMLElement;
    if (e?.toString() === idFirstCategory) {
      element.classList.remove('active');
    }
    if (e?.toString() !== idFirstCategory) {
      element.classList.remove('activeFirst');
    }
  };
  const handleClick = () => {
    dispatch(setSearch(''));
  };
  return (
    <Link
      key={`ca${id}`}
      className={index === 0 ? 'activeFirst' : ''}
      id={`ca${id}`}
      offset={10}
      onSetActive={(value: any) => onSetActive(value)}
      to={`${id}`}
      spy
      smooth
      duration={500}
      onClick={handleClick}
    >
      <ListItemButtonStyled id={id}>
        <ListItemText primary={name} />
      </ListItemButtonStyled>
    </Link>
  );
}
