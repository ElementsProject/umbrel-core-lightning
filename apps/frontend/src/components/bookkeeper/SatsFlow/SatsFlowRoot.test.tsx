import { render, screen } from '@testing-library/react';
import SatsFlowRoot from './SatsFlowRoot';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Sats Flow component ', () => {
  beforeEach(() => render(<SatsFlowRoot />));

  it('should be in the document', () => {
    expect(screen.getByTestId('satsflow-container')).not.toBeEmptyDOMElement();
  });
});
