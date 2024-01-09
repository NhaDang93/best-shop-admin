import { IReport } from '@/types';
import { formatNumber } from '@/utils';
import { Typography, styled } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

const TitleStyled = styled(Typography)(({ theme }) => ({
  color: '#212B36',
  fontFamily: 'Be VietNam Pro, sans-serif',
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '133.4%',
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  '@media (min-width:1024px)': {
    fontSize: '16px',
  },
  '@media (min-width:1200px)': {
    fontSize: '20px',
  },
  '@media (min-width:1400px)': {
    fontSize: '24px',
  },
}));
const PieChartReport = ({
  report,
  title = '',
}: {
  report: IReport;
  title?: string;
}) => {
  const total = useMemo(() => {
    const keyNames = Object.keys(report) as Array<keyof IReport>;

    return keyNames.reduce((acc, currentValue: keyof IReport) => {
      return acc + parseFloat(report?.[currentValue]);
    }, 0);
  }, [report]);

  const pieData = useMemo(() => {
    const keyNames = Object.keys(report) as Array<keyof IReport>;

    return keyNames.map((_keyName: keyof IReport) => {
      return {
        name: _keyName,
        value: report?.[_keyName],
      };
    });
  }, [report]);

  const option = {
    title: {
      text: title,
      subtext: `${formatNumber(total)} vnđ`,
      x: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: Object.keys(report) as Array<keyof IReport>,
    },
    series: [
      {
        name: 'Guest',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: pieData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  return <ReactECharts option={option} style={{ height: 300 }} lazyUpdate />;
};
export default PieChartReport;
