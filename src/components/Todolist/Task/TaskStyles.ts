import styled from "styled-components";

export interface StyledTaskType {
    isdone: string
}

export const StyledTask = styled.li<StyledTaskType>`
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: ${props => props.isdone === 'true' ? '0.4' : '1'};
`