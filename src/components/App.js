import React, { Component } from 'react';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Notification from './Notification';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleClick = e => {
    const { name } = e.currentTarget;
    this.setState(prevState => {
      return {
        [name]: prevState[name] + 1,
      };
    });
  };

  countTotalFeedback = allFeedbacks => {
    return Object.values(allFeedbacks).reduce((acc, value) => {
      return acc + value;
    }, 0);
  };

  countPositiveFeedbackPercentage = (total, percent) => {
    if (total > 0) {
      const purePercent = (percent * 100) / total;
      const roundedNumber = Math.round(purePercent);
      return roundedNumber;
    }
    return 0;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback(this.state);
    const popositivePercentage = this.countPositiveFeedbackPercentage(
      total,
      good
    );
    const options = Object.keys(this.state);
    return (
      <div
        style={{
          paddingTop: '100px',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          fontSize: 20,
          color: '#010101',
        }}
      >
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.handleClick}
          />
          {total > 0 ? (
            <>
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={total}
                popositivePercentage={popositivePercentage}
              />
            </>
          ) : (
            <>
              <Notification message="There is no feedback" />
            </>
          )}
        </Section>
      </div>
    );
  }
}

export default App;

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101',
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
