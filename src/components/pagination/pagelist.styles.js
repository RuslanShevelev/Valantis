// eslint-disable-next-line import/no-named-as-default
import styled from "styled-components"

export const pagination = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  gap: 15px;
  justify-content: flex-end;
width: 575px;
`

export const pageList = styled.ul`
  justify-self: end;
  display: flex;
  flex-direction: row;
  align-content: center;
  gap: 5px;
  justify-content: center;
  list-style: none;
  margin:0;
  padding:0;
`
export const pageItem = styled.button`
  height: 35px;
  width: 35px;
  background-color: ${(props) =>
    props.$active ? '#b672ff' : '#696969'};
  border-radius: 50%;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: black;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #b672ff;
    transform: scale(1.1);
  }
  &:disabled {
    background-color: transparent;
    transform: none;
    color: #696969;
    border-radius: 0;
    cursor: default;
  }
`
export const svgBtn = styled.svg`
fill: #D9D9D9;
width:36px;
height:36px;
`
export const svgDiv = styled.div`
width:36px;
height:36px;
cursor: pointer;
  transition: all 0.3s;
  &:hover {
    stroke: #b672ff;
    transform: scale(1.1);
  }

`
