import styled from '@emotion/styled';
import { Input } from '@mui/material';
import React, { useEffect, useState } from 'react';

const InputStyled = styled(Input)(({ theme }) => ({
  width: '50px',
  minHeight: '26px',
  margin: '0 4px',
  color: '#6e6b7b',
  fontSize: '14px',
  textAlign: 'center',
  background: '#f8f8f8',
  border: 0,
  borderRadius: '5px',
  '.MuiInput-input': {
    textAlign: 'center',
    '&:hover': {
      borderBottom: '0px solid rgba(58, 53, 65, 0.22)',
    },
  },
  '&.MuiInput-root': {
    textAlign: 'center',
    borderBottom: '0px solid rgba(58, 53, 65, 0.22)',
    ':before': {
      borderBottom: '0px solid rgba(58, 53, 65, 0.22)',
    },
    ':after': {
      borderBottom: '0px solid rgba(58, 53, 65, 0.22)',
    },
    ':hover': {
      borderBottom: '0px solid rgba(58, 53, 65, 0.22)',
    },
  },
  ':hover': {
    borderBottom: '0px solid rgba(58, 53, 65, 0.22)',
  },
}));

const InputQty = ({
  qty,
  id,
  handlerChangeCart,
}: {
  qty: number;
  id: string;
  handlerChangeCart?: (qty: string) => void;
}) => {
  const inputEl: React.RefObject<HTMLInputElement> = React.useRef(null);
  const [qtyInput, setQtyInput] = useState<string>(`${qty}`);

  const [checkEvent, setCheckEvent] = useState<boolean>(true);

  const onAmountChange = async (quantity: string) => {
    handlerChangeCart?.(quantity);
  };

  const handleBlur = async (e: any) => {
    if (e.target.value === '') {
      setCheckEvent(true);
      setQtyInput(`${qty}`);
    } else if (e?.target?.value >= 0) {
      onAmountChange(e?.target?.value ?? '0');
    } else {
      setQtyInput(`${qty}`);
    }
  };

  const handleChangeInput = (e: any) => {
    const { value } = e.target;
    const decimalPoint = value.replace(',', '.');
    const reg = /^[+-]?(\d+\.?\d*|\.\d+)$/;
    if (reg.test(decimalPoint) || decimalPoint === '' || decimalPoint === '-') {
      setQtyInput(e?.target?.value ?? 0);
    }
  };

  const handleClickInput = () => {
    setCheckEvent(false);
    setQtyInput(`${qty}`);
  };
  const handlersOnClick = () => {
    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  };

  useEffect(() => {
    handlersOnClick();
  }, [checkEvent]);

  useEffect(() => {
    setQtyInput(`${qty}`);
  }, [qty]);

  if (checkEvent === true) {
    return (
      <InputStyled
        // @ts-ignore
        key={id}
        className="amountInput"
        value={qtyInput}
        onClick={handleClickInput}
      />
    );
  }

  return (
    <InputStyled
      // @ts-ignore
      key={id}
      ref={inputEl}
      className="amountInput"
      value={qtyInput}
      onChange={handleChangeInput}
      onBlur={handleBlur}
      onKeyPress={(e: any) => {
        if (e.key === 'Enter') {
          if (e?.target?.value >= 0) {
            onAmountChange(e?.target?.value ?? '0');
          } else {
            setQtyInput(`${qty}`);
          }
        }
      }}
    />
  );
};

export default InputQty;
