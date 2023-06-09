import styled from 'styled-components'

export const HomeContainer = styled.div`
  max-width: 400px;
  background-color: ${(props) => props.theme['bg-color-secondary']};

  margin: 1rem auto;
  padding: 0.25rem;
  border-radius: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 400px) {
    margin: 0.5rem;
  }

  h1 {
    color: ${(props) => props.theme['color-primary']};
    font-weight: 400;
  }
`

export const SalesDetails = styled.p`
  font-size: 1.5rem;
`

export const Target = styled.p`
  color: ${(props) => props.theme['color-light']};
  font-size: 1rem;
`

interface PercentProps {
  percent: number
}

export const Percent = styled.div<PercentProps>`
  width: 150px;
  height: 150px;
  position: relative;
  margin: 0.5rem 0;

  span {
    color: white;
    font-size: 1.5rem;
    width: 110px;
    text-align: center;
    position: absolute;
    left: 50%;
    translate: -50%;
    top: 50%;
    transform: translateY(-50%);
  }

  svg {
    width: 150px;
    height: 150px;
    transform: rotate(90deg);

    position: relative;
  }

  svg circle {
    width: 100%;
    height: 100%;
    fill: transparent;
    stroke-width: 6;
    stroke: #191919;
    transform: translate(5px, 5px);

    &:nth-child(2) {
      stroke: #4db5ff;
      stroke-dasharray: 440;
      stroke-dashoffset: calc(440 - (440 * ${(props) => props.percent}));
    }
  }
`

export const DaysLeft = styled.span`
  margin-top: 0.5rem;
  color: ${(props) => props.theme['color-light']};
`
