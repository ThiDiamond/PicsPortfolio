import styled from 'styled-components';

export const Image = styled.div`
  width: 450px;
  height: 450px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  -moz-transition: -moz-transform 0.2s ease-in-out;
  -webkit-transition: -webkit-transform 0.2s ease-in-out;
  -ms-transition: -ms-transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out;
  max-width: 100%;
  vertical-align: middle;
  &&hover {
    -moz-transform: scale(1.075);
    -webkit-transform: scale(1.075);
    -ms-transform: scale(1.075);
    transform: scale(1.075);
  }
`;
