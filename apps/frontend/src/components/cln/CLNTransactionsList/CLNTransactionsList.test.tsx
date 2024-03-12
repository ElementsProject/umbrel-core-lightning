import { screen } from '@testing-library/react';
import CLNTransactionsList from './CLNTransactionsList';
import { renderWithMockContext, getMockStoreData } from '../../../utilities/test-utilities';

describe('CLNTransactionsList component ', () => {
  let providerProps;
  beforeEach(() => providerProps = JSON.parse(JSON.stringify(getMockStoreData())));

  it('if it is loading show the spinner', () => {
    providerProps.listLightningTransactions.isLoading = true;
    renderWithMockContext(<CLNTransactionsList />, { providerProps });
    expect(screen.getByTestId('cln-transactions-list-spinner')).toBeInTheDocument();
  });

  it('if it is not loading dont show the spinner', () => {
    renderWithMockContext(<CLNTransactionsList />, { providerProps });
    expect(screen.queryByTestId('cln-transactions-list-spinner')).not.toBeInTheDocument();
  })

  it('if it has an error, show the error view', () => {
    providerProps.listLightningTransactions.clnTransactions = [];
    providerProps.listLightningTransactions.error = "error message!";
    renderWithMockContext(<CLNTransactionsList />, { providerProps });
    expect(screen.getByTestId('cln-transactions-list-error')).toBeInTheDocument();
  })

  it('if it has transactions, show the offers list', () => {
    renderWithMockContext(<CLNTransactionsList />, { providerProps });
    const offersList = screen.getByTestId('cln-transactions-list');
    expect(offersList).toBeInTheDocument();
    expect(offersList.children.length).toBe(2);
  })

  it('if there are no channels, show the no offers text', () => {
    providerProps.listLightningTransactions.clnTransactions = [];
    renderWithMockContext(<CLNTransactionsList />, { providerProps });
    expect(screen.getByText('No transaction found. Click send/receive to start!')).toBeInTheDocument();
  })

  it('if there are active channels, show the proper text', () => {
    providerProps.listChannels.activeChannels = [];
    providerProps.listLightningTransactions.clnTransactions = [];
    renderWithMockContext(<CLNTransactionsList />, { providerProps });
    expect(screen.getByText('No transaction found. Open channel to start!')).toBeInTheDocument();
  })

});
