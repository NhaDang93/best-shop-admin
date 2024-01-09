import { Box as BoxMui, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DateRangeContainer = styled(BoxMui)<BoxProps>(({ theme }) => ({
  '& .rdrCalendarWrapper.rdrDateRangeWrapper': {
    width: '100%',

    '& .rdrMonth': {
      width: 'auto',
      '& .rdrDays': {
        '& .rdrStartEdge, .rdrEndEdge, .rdrInRange': {
          color: '#122257 !important'
        },
        '& .rdrDayNumber': {
          fontWeight: 500
        },
        '& .rdrDayNumber > span::after': {
          background: '#122257 !important'
        }
      }
    }
  },

  '& .define-range-custom': {
    '.rdrDefinedRangesWrapper': {
      width: '100%',

      '.rdrInputRanges': {
        display: 'none'
      },

      '.rdrStaticRanges': {
        height: '100%',

        [theme.breakpoints.down('sm')]: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          '.rdrStaticRange': {
            flex: 1,
            '.rdrStaticRangeLabel': {
              textAlign: 'center'
            }
          }
        }
      }
    },

    '.group-action': {
      padding: '10px',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'row-reverse',
        '.MuiButton-root': {
          marignBottom: 0,
          padding: '0.5rem 0.8125rem'
        }
      }
    }
  },

  '& .rdrStaticRangeLabel': {
    whiteSpace: 'nowrap'
  }
}));
