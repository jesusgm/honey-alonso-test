import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

function RadarChart({ categories }) {
  const options = {
    scale: {
      min: 0,
      stepSize: 1,
    },
  };

  const data = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        label: "Respuestas",
        data: categories.map((category) => category.value),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  return <Radar data={data} options={options} />;
}

RadarChart.propTypes = propTypes;

export default RadarChart;
