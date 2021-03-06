import { VictoryThemeDefinition } from 'victory';
import { TEXT_GRAY } from '../constants/colors';

// Adapted from Victory material theme

const blueGrey300 = "#90A4AE";
const blueGrey700 = "#455A64";
const grey900 = "#212121";
const white = "#FFFFFF";

// *
// * Typography
// *
const sansSerif = "'Roboto', 'Helvetica Neue', Helvetica, sans-serif";
const letterSpacing = "normal";
const fontSize = 12;
// *
// * Layout
// *
const padding = 8;
const baseProps = {
    padding: { left: 60, top: 20, bottom: 60 }
};
// *
// * Labels
// *
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding,
  fill: white,
  stroke: "transparent",
  strokeWidth: 0
};

const centeredLabelStyles = Object.assign({ textAnchor: "middle" }, baseLabelStyles);
// *
// * Strokes
// *
const strokeLinecap = "round";
const strokeLinejoin = "round";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function getDateStr(d: number): string {
    const date = new Date(d);
    return `${months[date.getMonth()]} ${date.getDate()}`
}

export const chartTheme: VictoryThemeDefinition = {
  area: Object.assign(
    {
      style: {
        data: {
          fill: grey900
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),
  axis: Object.assign(
    {
      style: {
        axis: {
          fill: "transparent",
          stroke: blueGrey300,
          strokeWidth: 2,
          strokeLinecap,
          strokeLinejoin
        },
        axisLabel: Object.assign({}, centeredLabelStyles, {
          padding,
          stroke: "transparent"
        }),
        grid: {
          fill: "none",
          stroke: TEXT_GRAY,
          strokeLinecap,
          strokeLinejoin,
          pointerEvents: "painted"
        },
        ticks: {
          fill: "transparent",
          size: 5,
          stroke: blueGrey300,
          strokeWidth: 1,
          strokeLinecap,
          strokeLinejoin,
        },
        tickLabels: Object.assign({}, baseLabelStyles, {
          fill: white
        })
      }
    },
    baseProps
  ),
  chart: baseProps,
  dependentAxis: {
    tickFormat: (y: number) => `${Math.round(y)} lbs`,
  },
  independentAxis: {
    tickFormat: (x: number) => getDateStr(x),
    tickCount: 5,
  },
  line: Object.assign(
    {
      style: {
        data: {
          fill: "transparent",
          opacity: 1,
          stroke: blueGrey700,
          strokeWidth: 2
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),
} as any;