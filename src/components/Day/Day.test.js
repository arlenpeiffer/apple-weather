import React from 'react';
import { shallow } from 'enzyme';
import Day from './index';

const setUp = (props = {}) => {
  const component = shallow(<Day {...props} />);
  return component;
};

const findByTestAttribute = (component, attribute) => {
  const wrapper = component.find(`[data-test="${attribute}"]`);
  return wrapper;
};

describe('Day Component', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      day: {
        high: 0,
        icon: 'icon',
        low: 0,
        weekday: 'weekday'
      },
      today: true
    };
    wrapper = setUp(props);
  });

  it('Should render without errors', () => {
    const component = findByTestAttribute(wrapper, 'dayComponent');
    expect(component.length).toBe(1);
  });

  it('Should render a weekday name', () => {
    const dayName = findByTestAttribute(wrapper, 'dayOfWeek');
    expect(dayName.length).toBe(1);
  });
});
