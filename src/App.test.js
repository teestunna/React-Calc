import { render, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "@testing-library/jest-dom";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

afterEach(cleanup);

it("it renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div)
})

it("it renders wti ops button correctly", () => {
  const { getByTestId } = render(<App />)
  expect(getByTestId('wti-op-button')).toHaveTextContent("WTI")
  
})

it("it renders digit 9 button correctly", () => {
  const { getByTestId } = render(<App />)
  expect(getByTestId('9')).toHaveTextContent("9")
  
})

it("it calls the get price function", () => {
  const mockCallBack = jest.fn();
  const getWti = shallow((<button label="WTI" data-testid="wti-op-button" data-tip='Get Price' onClick={mockCallBack}>WTI</button>));
  getWti.find('button').simulate('click')
  expect(mockCallBack).toHaveBeenCalled();
})

it("it gets the price", () => {
  const wrapper = shallow(<App />);

  wrapper.find('.wti').simulate('click');
  wrapper.update();
  expect(wrapper.find('.display').text()).toBe("45");

})

it("1 + 2 = 3", () => {
  const wrapper = shallow(<App />);

  wrapper.find('[label=1]').simulate('click');
  wrapper.find('.add').simulate('click');
  wrapper.find('[label=2]').simulate('click');
  wrapper.find('.equals').simulate('click');

  wrapper.update();

  expect(wrapper.find('.display').text()).toBe("3");
})

it("2 * 3 = 6", () => {
  const wrapper = shallow(<App />);

  wrapper.find('[label=2]').simulate('click');
  wrapper.find('.mult').simulate('click');
  wrapper.find('[label=3]').simulate('click');
  wrapper.find('.equals').simulate('click');

  wrapper.update();

  expect(wrapper.find('.display').text()).toBe("6");
})

it("8 / 4 = 2", () => {
  const wrapper = shallow(<App />);

  wrapper.find('[label=8]').simulate('click');
  wrapper.find('.divide').simulate('click');
  wrapper.find('[label=4]').simulate('click');
  wrapper.find('.equals').simulate('click');

  wrapper.update();

  expect(wrapper.find('.display').text()).toBe("2");
})

it("8 - 5 = 3", () => {
  const wrapper = shallow(<App />);

  wrapper.find('[label=8]').simulate('click');
  wrapper.find('.sub').simulate('click');
  wrapper.find('[label=5]').simulate('click');
  wrapper.find('.equals').simulate('click');

  wrapper.update();

  expect(wrapper.find('.display').text()).toBe("3");
})

it("root of 81 is 9", () => {
  const wrapper = shallow(<App />);

  wrapper.find('[label=8]').simulate('click');
  wrapper.find('[label=1]').simulate('click');
  wrapper.find('.sqrt').simulate('click');
  wrapper.find('.equals').simulate('click');

  wrapper.update();

  expect(wrapper.find('.display').text()).toBe("9");
})

it("4 raise to power 2 is 16", () => {
  const wrapper = shallow(<App />);

  wrapper.find('[label=4]').simulate('click');
  wrapper.find('.exp').simulate('click');
  wrapper.find('[label=2]').simulate('click');
  wrapper.find('.equals').simulate('click');

  wrapper.update();

  expect(wrapper.find('.display').text()).toBe("16");
})

it("Clear", () => {
  const wrapper = shallow(<App />);

  wrapper.find('[label=4]').simulate('click');
  wrapper.find('.c').simulate('click');

  wrapper.update();

  expect(wrapper.find('.display').text()).toBe("0");
})

it("Backspace 45 to display 4", () => {
  const wrapper = shallow(<App />);

  wrapper.find('[label=4]').simulate('click');
  wrapper.find('[label=5]').simulate('click');
  wrapper.find('.del').simulate('click');

  wrapper.update();

  expect(wrapper.find('.display').text()).toBe("4");
})





