
import PropTypes from 'prop-types';

const PredictionResults = ({ result }) => {
  if (!result) return null

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4 text-dark-blue">Prediction Results</h2>
      <p className="mb-2">
        <span className="font-semibold">Prediction:</span> {result.result}
      </p>
      <p>
        <span className="font-semibold">Confidence:</span> {(result.confidence * 100).toFixed(2)}%
      </p>
    </div>
  )
}

PredictionResults.propTypes = {
  result: PropTypes.shape({
    result: PropTypes.string.isRequired,
    confidence: PropTypes.number.isRequired,
  }).isRequired,
};

export default PredictionResults;

