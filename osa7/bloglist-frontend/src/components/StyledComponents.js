/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// https://coolors.co/01baef-60435f-d67ab1-e2a3c7-fdf7fa
const cyanProcess = 'rgb(1, 186, 239)';
const blueGreen ='rgb(0, 145, 186)';
const englishViolet = 'rgb(96, 67, 95)';
const middlePurple = 'rgb(214, 122, 177)';
const kobi = 'rgb(226, 163, 199)';
const snow = 'rgb(253, 247, 250)';

// https://coolors.co/f7f0f5-decbb7-8f857d-5c5552-433633
const magnolia = '#F7F0F5';
const almond = '#DECBB7';
const middleGray = '#8F857D';
const davysGray = '#5C5552';
const blackCoffee = '#433633';

const yellowCrayola = '#F8E16C';

export const Button = styled.button`
  background: ${props => props.priority === 'secondary' ? magnolia : yellowCrayola};
  :hover { background: ${blackCoffee}; color: ${magnolia} };
  font-weight: bold;
  color: ${blackCoffee};
  font-size: 0.8em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 1px solid ${blackCoffee};
  border-radius: 5px;
`;

export const Input = styled.input`
  padding: 0.25em;
  margin: 0.25em;
  border: 1px solid ${blackCoffee};
  border-radius: 5px;
  background: ${magnolia};
  color: ${blackCoffee};
  :focus { background: ${yellowCrayola}; color: ${blackCoffee} };
`;

export const StyledLink = styled(Link)`
  color: ${props => props.colortheme === 'light' ? magnolia : blackCoffee};
  font-weight: bold;
  padding: 5px;
`;


export const Menu = styled.div`
  background: ${middleGray};
  padding: 0.5em 1em;
  margin: 0;
  color: ${magnolia};
  border-radius: 10px 10px 0px 0px;
  border: 1px solid ${davysGray};
  filter: drop-shadow(0 0.4em 0.0em ${davysGray});
  position: relative;
  z-index:2;
`;

export const Page = styled.div`
  background: ${magnolia};
  padding: 1em 5em;
  margin: 0;
  border-radius: 0px 0px 10px 10px;
  border: 1px solid ${middleGray};
  filter: drop-shadow(0 0.3em 0.0em ${middleGray});
`;

export const Login = styled.div`
  background: ${magnolia};
  padding: 1em 5em;
  margin: 0;
  border-radius: 10px;
  border: 1px solid ${middleGray};
  filter: drop-shadow(0 0.3em 0.0em ${middleGray});
`;

export const Box = styled.div`
  background: ${almond};
  padding: 0.5em;
  margin-top: 1em;
  border-radius: 5px;
  border: 1px solid ${middleGray};
  filter: drop-shadow(0 0.3em 0.0em ${middleGray});
  color: ${blackCoffee};
`;

export const setBodyStyle = () => {
  document.body.style.margin = '2em 20em';
  document.body.style.background = almond;
  document.body.style.color = blackCoffee;
};