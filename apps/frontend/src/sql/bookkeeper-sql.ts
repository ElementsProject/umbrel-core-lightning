export const BalanceSheetSQL = "SELECT peerchannels.short_channel_id, nodes.alias, SUM(bkpr_accountevents.credit_msat) - SUM(bkpr_accountevents.debit_msat) AS net_sum, bkpr_accountevents.account FROM bkpr_accountevents LEFT JOIN peerchannels ON upper(bkpr_accountevents.account)=hex(peerchannels.channel_id) LEFT JOIN nodes ON peerchannels.peer_id=nodes.nodeid WHERE type != 'onchain_fee' GROUP BY account;";
