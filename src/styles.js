// src/styles.js
import styled from 'styled-components';

export const TaskContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

export const ColumnContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
  background-color: #f4f5f7;
`;

export const ColumnTitle = styled.h3`
  padding: 8px;
`;

export const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;
